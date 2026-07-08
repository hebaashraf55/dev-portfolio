"use client";

import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import { Terminal } from "@/components/ui/Terminal";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-neon-cyan/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-neon-purple/5 blur-[100px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 py-20 lg:flex-row lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-md border border-neon-cyan/20 bg-neon-cyan/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">
              {siteConfig.title}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 font-mono text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
          >
            <span className="text-foreground">{siteConfig.name}</span>
            <br />
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Systems Engineer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted lg:text-lg"
          >
            {siteConfig.tagline}. Crafting scalable APIs, robust backends, and
            pixel-perfect interfaces with surgical precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <LinkButton href="#projects" variant="primary" size="lg">
              View Work
              <ChevronRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton href="#contact" variant="secondary" size="lg">
              Contact Me
            </LinkButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 hidden lg:block"
          >
            <a
              href="#about"
              className="inline-flex flex-col items-center gap-2 text-muted transition-colors hover:text-neon-cyan"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest">
                Scroll
              </span>
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </a>
          </motion.div>
        </div>

        <div className="flex w-full flex-1 justify-center lg:justify-end">
          <Terminal />
        </div>
      </div>
    </section>
  );
}
