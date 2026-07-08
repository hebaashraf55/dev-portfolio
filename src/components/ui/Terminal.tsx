"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";
import { siteConfig } from "@/config/site";

interface TerminalLine {
  type: "system" | "input" | "output" | "error";
  content: string;
}

const TERMINAL_USER = "heba-ashraf@portfolio";

const WELCOME_MESSAGE = [
  "> Initializing developer environment...",
  "> Loading modules: React, Node.js, PostgreSQL, Docker",
  `> System ready. Welcome to ${siteConfig.name}'s portfolio.`,
  "",
  "Type 'help' to see available commands.",
];

const COMMANDS: Record<string, string | string[]> = {
  help: [
    "Available commands:",
    "  help     — Show this help message",
    "  skills   — List core technical skills",
    "  about    — Brief developer bio",
    "  contact  — Contact information",
    "  clear    — Clear terminal output",
    "  whoami   — Display current user",
  ],
  skills: [
    "Core Skills:",
    "  ▸ Backend:  Node.js, Go, Python, PostgreSQL, Redis, gRPC",
    "  ▸ Frontend: React, Next.js, TypeScript, Tailwind CSS",
    "  ▸ DevOps:   Docker, Kubernetes, AWS, CI/CD, Terraform",
  ],
  about:
    "Full-stack engineer specializing in backend systems, API design, and distributed architecture. Passionate about building production-grade software.",
  contact: [
    "Contact:",
    `  Email:    ${siteConfig.emails.join(", ")}`,
    `  Location: ${siteConfig.location}`,
    `  GitHub:   ${siteConfig.github.replace("https://", "")}`,
    `  LinkedIn: ${siteConfig.linkedin.replace("https://", "")}`,
  ],
  whoami: `${TERMINAL_USER} ~ ${siteConfig.title}`,
};

export function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [isTypingWelcome, setIsTypingWelcome] = useState(true);
  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (welcomeIndex < WELCOME_MESSAGE.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [
          ...prev,
          { type: "system", content: WELCOME_MESSAGE[welcomeIndex] },
        ]);
        setWelcomeIndex((i) => i + 1);
      }, welcomeIndex === 0 ? 400 : 120);
      return () => clearTimeout(timer);
    }
    setIsTypingWelcome(false);
    setShowPrompt(true);
  }, [welcomeIndex]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    setLines((prev) => [...prev, { type: "input", content: `$ ${cmd}` }]);

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    const response = COMMANDS[trimmed];
    if (response) {
      const outputLines = Array.isArray(response) ? response : [response];
      setLines((prev) => [
        ...prev,
        ...outputLines.map((line) => ({
          type: "output" as const,
          content: line,
        })),
      ]);
    } else if (trimmed) {
      setLines((prev) => [
        ...prev,
        {
          type: "error",
          content: `Command not found: '${cmd}'. Type 'help' for available commands.`,
        },
      ]);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTypingWelcome) return;
    executeCommand(input);
    setInput("");
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="neon-border w-full max-w-2xl overflow-hidden rounded-lg bg-card"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-2">
          <TerminalIcon className="h-3.5 w-3.5 text-muted" />
          <span className="font-mono text-xs text-muted">{TERMINAL_USER}</span>
        </div>
      </div>

      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className="h-64 cursor-text overflow-y-auto p-4 font-mono text-sm leading-relaxed md:h-72"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.type === "system"
                ? "text-neon-cyan/80"
                : line.type === "input"
                  ? "mt-2 text-foreground"
                  : line.type === "error"
                    ? "text-red-400"
                    : "text-muted"
            }
          >
            {line.content || "\u00A0"}
          </div>
        ))}

        {showPrompt && (
          <form onSubmit={handleSubmit} className="mt-2 flex items-center">
            <span className="mr-2 text-neon-cyan">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent font-mono text-sm text-foreground outline-none caret-neon-cyan"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <span className="cursor-blink ml-0.5 inline-block h-4 w-2 bg-neon-cyan" />
          </form>
        )}
      </div>
    </motion.div>
  );
}
