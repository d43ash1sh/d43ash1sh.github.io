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
          Welcome to DebOS v1.0.0
          <br />
          Type <span className="text-blue-400">&apos;help&apos;</span> to see available commands.
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
              <li><span className="text-blue-400">whoami</span> - Display user identity</li>
              <li><span className="text-blue-400">skills</span> - List technical expertise</li>
              <li><span className="text-blue-400">projects</span> - View featured projects</li>
              <li><span className="text-blue-400">contact</span> - Show contact information</li>
              <li><span className="text-blue-400">sudo hack-website</span> - ???</li>
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
            <div className="text-gray-300">Security Researcher & Full-Stack Developer</div>
            <div className="text-gray-400">Built with ❤️ in Assam, India.</div>
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="text-gray-300">
            {Object.entries(personalEn.skills).map(([category, items], idx) => (
              <div key={idx} className="mb-2">
                <span className="text-green-400 font-bold">{category}:</span>{" "}
                {items}
              </div>
            ))}
          </div>
        );
        break;
      case "projects":
        output = (
          <div className="text-gray-300">
            {personalEn.projects.map((proj, idx) => (
              <div key={idx} className="mb-2">
                <span className="text-blue-400 font-bold">{proj.title}</span> -{" "}
                <a href={proj.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                  Link
                </a>
              </div>
            ))}
          </div>
        );
        break;
      case "contact":
        output = (
          <div className="text-gray-300">
            Email: <a href="mailto:d4shh4x0r@wearehackerone.com" className="text-blue-400 hover:underline">d4shh4x0r@wearehackerone.com</a>
          </div>
        );
        break;
      case "sudo hack-website":
        output = (
          <div className="text-red-500 font-bold animate-pulse">
            ACCESS DENIED. THIS INCIDENT WILL BE REPORTED. 🚨
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
          className="fixed top-0 left-0 right-0 z-50 h-[50vh] bg-black/95 border-b border-green-500/50 shadow-2xl backdrop-blur-md font-mono text-sm"
        >
          <div className="flex flex-col h-full p-4 overflow-hidden">
            <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors" onClick={() => setIsOpen(false)} />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-gray-500 text-xs">user@debashish-portfolio:~</div>
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
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
