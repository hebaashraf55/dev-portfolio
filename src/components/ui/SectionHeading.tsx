"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-16 text-center", className)}
    >
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">
        {label}
      </span>
      <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
      <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
    </motion.div>
  );
}
