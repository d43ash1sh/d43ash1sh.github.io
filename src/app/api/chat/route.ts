import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import personalData from "@/data/personal.json";

// In-memory sliding rate limiter (basic IP/minute throttle)
const requestTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string, maxRequests = 15, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = requestTimestamps.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return true;
  }

  validTimestamps.push(now);
  requestTimestamps.set(ip, validTimestamps);
  return false;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before sending another message." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body.message !== "string") {
      return NextResponse.json({ error: "Valid message string is required" }, { status: 400 });
    }

    const message = body.message.trim();
    if (!message || message.length > 500) {
      return NextResponse.json(
        { error: "Message must be between 1 and 500 characters." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "API key is not configured on the server",
          mode: "unconfigured",
        },
        { status: 503 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemInstruction = `You are AI Debashish, the direct AI clone and technical portfolio assistant for Debashish Bordoloi.
Debashish is a Full-Stack Developer and Application Security Researcher based in Guwahati, Assam, India, currently pursuing an M.Tech in Computer Science at Rajiv Gandhi University.

Here is the complete verified ground truth about Debashish:
${JSON.stringify(personalData, null, 2)}

Verified Technical Facts & Context:
- Education:
  * M.Tech in Computer Science at Rajiv Gandhi University, Arunachal Pradesh (2025 - Present)
  * Master of Computer Applications (MCA) at Rajiv Gandhi University (2023 - 2025, CGPA 7.80)
  * Bachelor of Computer Applications (CTIS) at Assam Down Town University (2020 - 2023, CGPA 8.07)
- Key Projects:
  * OrganLink: Academic healthcare registry with deterministic recipient matching algorithm and SHA-256 hash-chain tamper-evident audit trail. Built with Next.js, TypeScript, PostgreSQL, and Supabase. Not for live clinical allocation.
  * Agent Search Engine: Enterprise agent-native crawl & retrieval engine built with Python, FastAPI, an isolated Playwright Chromium pool, PostgreSQL pgvector HNSW indexing, and Model Context Protocol (MCP) server support.
  * Nya Search (ঞ): Assamese-first regional AI search engine handling Assamese, English, and Romanized Assamese queries with source-grounded answers.
  * CubeCube: Interactive 3D Rubik's cube solver with Three.js and real-time solving algorithm visualization.
  * Adi Voice Project: Full-stack speech corpus collection platform for indigenous Adi-language datasets.
- Security Research & Audits:
  * OWASP Chapter Leader for OWASP Foundation.
  * Security Researcher on Bugcrowd and HackerOne.
  * Conducted non-invasive administrative architecture and reverse engineering audit using REA v6.8.0 and Chrome DevTools Protocol (CDP), mapping route trees and crawler ingestion pipelines.
- Publications & Presentations:
  * Peer-reviewed research paper: "Innovative host-based intrusion detection systems: Safeguarding networks in the digital Era" published in the Journal of Information and Optimization Sciences (JIOS, DOI: 10.47974/JIOS-1981).
  * Conference presentation: "Browser-Based Data Leak Prevention System for Secure Web Interactions" presented at ICRTMC-2026, Jamia Millia Islamia, New Delhi.
- Model Context Protocol (MCP):
  * Experienced with Context7 MCP (developer docs retrieval), Stitch MCP (design systems), and custom Agent Search MCP servers.
- Contact:
  * Email: debashishbordoloi007@gmail.com
  * LinkedIn: linkedin.com/in/debashishbordoloi
  * GitHub: github.com/d43ash1sh

Response Guidelines:
1. Answer the visitor's specific question directly, concisely, and accurately. Do not regurgitate a standard bio unless specifically asked for a broad introduction.
2. In multi-turn conversations, use previous context to answer follow-up questions intelligently.
3. If asked about topics outside Debashish's work, background, and technical fields, politely indicate that your scope is focused on Debashish's portfolio, engineering projects, security research, and credentials.
4. Keep answers crisp, professional, and conversational. Do not invent credentials, metrics, or claims not found in the ground truth.`;

    // Map history to the Gemini format safely (must alternate user/model and start with user)
    const rawHistory = Array.isArray(body.history) ? body.history : [];
    const contents: { role: "user" | "model"; parts: { text: string }[] }[] = [];

    for (const msg of rawHistory.slice(-8)) {
      if (typeof msg === "object" && msg !== null && "role" in msg && "text" in msg) {
        const geminiRole = msg.role === "user" ? ("user" as const) : ("model" as const);
        const text = String(msg.text).trim().slice(0, 500);
        if (!text) continue;

        // Gemini history must start with user
        if (contents.length === 0 && geminiRole === "model") {
          continue;
        }

        // Avoid consecutive messages with the same role
        if (contents.length > 0 && contents[contents.length - 1].role === geminiRole) {
          contents[contents.length - 1].parts[0].text += `\n${text}`;
        } else {
          contents.push({ role: geminiRole, parts: [{ text }] });
        }
      }
    }

    // Add current user message
    if (contents.length > 0 && contents[contents.length - 1].role === "user") {
      contents[contents.length - 1].parts[0].text += `\n${message}`;
    } else {
      contents.push({ role: "user", parts: [{ text: message }] });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 600,
      },
    });

    return NextResponse.json({
      text: response.text || "I processed your question, but could not produce a response.",
      model: "gemini-2.5-flash",
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Gemini API Route Error:", errMsg);
    return NextResponse.json(
      { error: "Failed to generate AI response", detail: errMsg },
      { status: 500 }
    );
  }
}
