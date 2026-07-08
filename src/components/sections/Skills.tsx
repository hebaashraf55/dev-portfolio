"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ApiSimulation } from "@/components/ui/ApiSimulation";
import { skillCategories } from "@/config/skills";
import { cn } from "@/lib/utils";
import type { SkillCategory } from "@/types";

export function Skills() {
  const [activeTab, setActiveTab] = useState<SkillCategory["id"]>("frontend");
  const activeCategory = skillCategories.find((c) => c.id === activeTab)!;

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Skills"
          title="Technical Arsenal"
          description="A systematic breakdown of the technologies I use to architect, build, and deploy production systems."
        />

        {/* Tabs */}
        <div className="mx-auto mb-10 flex max-w-md justify-center rounded-lg border border-border bg-card p-1">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={cn(
                "relative flex-1 rounded-md px-4 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors",
                activeTab === category.id
                  ? "text-neon-cyan"
                  : "text-muted hover:text-foreground"
              )}
            >
              {activeTab === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-md border border-neon-cyan/20 bg-neon-cyan/5"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {activeCategory.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="neon-border rounded-lg bg-card p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-foreground">
                    {skill.name}
                  </span>
                  {skill.level && (
                    <span className="font-mono text-xs text-neon-cyan">
                      {skill.level}%
                    </span>
                  )}
                </div>
                {skill.level && (
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-border">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* API Simulation — shown when Backend tab is active */}
        <AnimatePresence>
          {activeTab === "backend" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ApiSimulation />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
