"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import personalEn from "@/data/personal.json";

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: "",
      output: (
        <div className="text-green-500 mb-2">
          Welcome to DebOS v2.0.0 (Interactive Developer Shell)
          <br />
          Type <span className="text-blue-400">&apos;help&apos;</span> to see available commands. Press <span className="text-amber-400">` (backtick)</span> or <span className="text-amber-400">Esc</span> to close.
        </div>
      ),
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "Escape") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode = "";

    switch (trimmedCmd) {
      case "help":
        output = (
          <div className="text-green-400">
            Available commands:
            <ul className="mt-1 ml-4 space-y-1 text-gray-300">
              <li><span className="text-blue-400">whoami</span> - Display developer identity</li>
              <li><span className="text-blue-400">skills</span> - List categorized technical skills</li>
              <li><span className="text-blue-400">projects</span> - View all featured projects</li>
              <li><span className="text-blue-400">systems</span> - Inspect Agent Search &amp; deep systems</li>
              <li><span className="text-blue-400">rea</span> - View REA reverse engineering audit summary</li>
              <li><span className="text-blue-400">mcp</span> - Show Model Context Protocol tooling</li>
              <li><span className="text-blue-400">research</span> - Display publications and conference participation</li>
              <li><span className="text-blue-400">contact</span> - Show verified contact details</li>
              <li><span className="text-blue-400">sudo hack-website</span> - Security easter egg</li>
              <li><span className="text-blue-400">clear</span> - Clear terminal output</li>
              <li><span className="text-blue-400">exit</span> - Close terminal</li>
            </ul>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div>
            <div className="font-bold text-white">Debashish Bordoloi</div>
            <div className="text-gray-300">Full Stack Developer · Security Researcher · AI Tooling Engineer</div>
            <div className="text-gray-400">M.Tech (CSE) at Rajiv Gandhi University · Based in Guwahati, Assam</div>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="text-gray-300 space-y-1.5">
            {Object.entries(personalEn.skills).map(([category, items], idx) => (
              <div key={idx}>
                <span className="text-green-400 font-bold">{category}:</span>{" "}
                <span className="text-gray-300">{(items as string[]).join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="text-gray-300 space-y-1.5">
            {personalEn.projects.map((proj, idx) => (
              <div key={idx}>
                <span className="text-blue-400 font-bold">{proj.title}</span>{" "}
                <span className="text-xs text-gray-400">[{proj.status}]</span>:{" "}
                <span className="text-gray-300">{proj.description}</span>{" "}
                <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline hover:text-white">
                  Demo
                </a>
              </div>
            ))}
          </div>
        );
        break;

      case "systems":
      case "agent-search":
        output = (
          <div className="text-gray-300 space-y-1">
            <div className="font-bold text-indigo-400">{personalEn.technicalWork.agentSearch.title}</div>
            <div className="text-xs text-gray-400">{personalEn.technicalWork.agentSearch.summary}</div>
            <div className="text-green-400 text-xs mt-1">Endpoints: {personalEn.technicalWork.agentSearch.endpoints.join(", ")}</div>
          </div>
        );
        break;

      case "rea":
        output = (
          <div className="text-gray-300 space-y-1">
            <div className="font-bold text-red-400">{personalEn.technicalWork.rea.title}</div>
            <div className="text-xs text-gray-400">{personalEn.technicalWork.rea.summary}</div>
            <div className="text-xs text-gray-300 mt-1">Tooling: {personalEn.technicalWork.rea.tooling}</div>
          </div>
        );
        break;

      case "mcp":
        output = (
          <div className="text-gray-300 space-y-1.5">
            <div className="font-bold text-purple-400">Integrated Model Context Protocol Servers:</div>
            {personalEn.technicalWork.mcp.servers.map((s, idx) => (
              <div key={idx} className="text-xs">
                <span className="text-green-400 font-semibold">{s.name}</span>: {s.purpose}
              </div>
            ))}
          </div>
        );
        break;

      case "research":
        output = (
          <div className="text-gray-300 space-y-2">
            {personalEn.research.map((r, idx) => (
              <div key={idx} className="text-xs">
                <span className="text-amber-400 font-bold">[{r.type}]</span> {r.title}
                <div className="text-gray-400">{r.venue} ({r.date || ""})</div>
                {r.doi && <div className="text-blue-400">DOI: {r.doi}</div>}
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="text-gray-300 space-y-1">
            <div>Email: <a href="mailto:debashishbordoloi007@gmail.com" className="text-blue-400 hover:underline">debashishbordoloi007@gmail.com</a></div>
            <div>GitHub: <a href="https://github.com/d43ash1sh" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/d43ash1sh</a></div>
            <div>LinkedIn: <a href="https://www.linkedin.com/in/debashishbordoloi/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">linkedin.com/in/debashishbordoloi</a></div>
            <div>HackerOne: <a href="https://hackerone.com/d4shh4x0r" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">hackerone.com/d4shh4x0r</a></div>
            <div>Bugcrowd: <a href="https://bugcrowd.com/d43ash1sh" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">bugcrowd.com/d43ash1sh</a></div>
          </div>
        );
        break;

      case "sudo hack-website":
        output = (
          <div className="text-red-500 font-bold animate-pulse">
            ACCESS DENIED. THIS INCIDENT HAS BEEN LOGGED TO NULL. 🚨
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      case "exit":
        setIsOpen(false);
        return;

      case "":
        break;

      default:
        output = (
          <div className="text-red-400">
            Command not found: {trimmedCmd}. Type &apos;help&apos; for available commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) {
      processCommand(input);
      setInput("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed top-0 left-0 right-0 z-50 h-[55vh] bg-black/95 border-b border-green-500/50 shadow-2xl backdrop-blur-md font-mono text-sm"
        >
          <div className="flex flex-col h-full p-4 overflow-hidden">
            <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
              <div className="flex space-x-2">
                <div 
                  className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors" 
                  onClick={() => setIsOpen(false)}
                  title="Close Terminal"
                />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-gray-500 text-xs">debashish@portfolio:~</div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 custom-scrollbar">
              {history.map((log, index) => (
                <div key={index} className="mb-3">
                  {log.command && (
                    <div className="flex">
                      <span className="text-green-500 mr-2">➜</span>
                      <span className="text-blue-400 mr-2">~</span>
                      <span className="text-white">{log.command}</span>
                    </div>
                  )}
                  <div className="mt-1 pl-4">{log.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSubmit} className="mt-2 flex items-center shrink-0">
              <span className="text-green-500 mr-2">➜</span>
              <span className="text-blue-400 mr-2">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none placeholder-gray-700 font-mono caret-green-500"
                spellCheck="false"
                autoComplete="off"
                placeholder="type a command..."
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
