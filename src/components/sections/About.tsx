"use client";

import { motion } from "framer-motion";
import { Code2, Layers, Server, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const principles = [
  {
    icon: Code2,
    title: "Clean Architecture",
    description:
      "Every system I build follows SOLID principles and clean architecture patterns. Separation of concerns isn't optional — it's foundational.",
  },
  {
    icon: Server,
    title: "Backend-First Mindset",
    description:
      "API design is where great products begin. I architect RESTful and GraphQL endpoints with versioning, rate limiting, and comprehensive documentation.",
  },
  {
    icon: Layers,
    title: "Logical Structuring",
    description:
      "From database schemas to microservice boundaries, I prioritize logical, maintainable structures that scale with your team and traffic.",
  },
  {
    icon: Zap,
    title: "Performance Engineering",
    description:
      "Sub-20ms response times, efficient caching strategies, and query optimization. Performance is a feature, not an afterthought.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="About"
          title="Engineering With Intent"
          description="I approach software the way a systems architect approaches infrastructure — with deliberate structure, measurable outcomes, and zero tolerance for unnecessary complexity."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {principles.map((principle) => (
            <motion.div
              key={principle.title}
              variants={fadeInUp}
              className="neon-border group rounded-lg bg-card p-6 transition-shadow duration-300 hover:glow-purple"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md border border-neon-purple/20 bg-neon-purple/5">
                <principle.icon className="h-5 w-5 text-neon-purple" />
              </div>
              <h3 className="font-mono text-base font-semibold text-foreground">
                {principle.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 rounded-lg border border-border bg-card-elevated p-8 text-center"
        >
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted">
            With{" "}
            <span className="font-mono text-neon-cyan">8+ years</span> of
            experience shipping production systems, I specialize in designing
            backend architectures that handle real-world scale. From{" "}
            <span className="text-foreground">distributed APIs</span> to{" "}
            <span className="text-foreground">event-driven pipelines</span>, I
            build the infrastructure that powers modern applications.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
