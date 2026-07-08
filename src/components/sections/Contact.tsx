"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import type { ContactFormData, FormStatus } from "@/types";

const initialForm: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    /*
     * ── Email API Integration ──────────────────────────────────────
     *
     * Option A: Web3Forms (free, no backend required)
     * ─────────────────────────────────────────────────
     * 1. Get your access key at https://web3forms.com
     * 2. Uncomment the block below and replace YOUR_ACCESS_KEY
     *
     * try {
     *   const res = await fetch("https://api.web3forms.com/submit", {
     *     method: "POST",
     *     headers: { "Content-Type": "application/json" },
     *     body: JSON.stringify({
     *       access_key: "YOUR_ACCESS_KEY",
     *       name: form.name,
     *       email: form.email,
     *       message: form.message,
     *     }),
     *   });
     *   if (!res.ok) throw new Error("Failed to send");
     *   setStatus("success");
     *   setForm(initialForm);
     * } catch {
     *   setStatus("error");
     * }
     *
     * Option B: Resend (requires API route)
     * ──────────────────────────────────────
     * 1. npm install resend
     * 2. Create src/app/api/contact/route.ts with Resend SDK
     * 3. Uncomment the block below
     *
     * try {
     *   const res = await fetch("/api/contact", {
     *     method: "POST",
     *     headers: { "Content-Type": "application/json" },
     *     body: JSON.stringify(form),
     *   });
     *   if (!res.ok) throw new Error("Failed to send");
     *   setStatus("success");
     *   setForm(initialForm);
     * } catch {
     *   setStatus("error");
     * }
     * ──────────────────────────────────────────────────────────────
     */

    // Simulated send for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
    setForm(initialForm);
  };

  const updateField = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neon-cyan/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Contact"
          title="Get In Touch"
          description="Have a project in mind or want to discuss backend architecture? I'd love to hear from you."
        />

        <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  Email
                </span>
                <div className="mt-1 space-y-1">
                  {siteConfig.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block font-mono text-sm text-neon-cyan transition-colors hover:text-neon-cyan/80"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  Location
                </span>
                <p className="mt-1 text-sm text-foreground">
                  {siteConfig.location}
                </p>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  Status
                </span>
                <p className="mt-1 flex items-center gap-2 text-sm text-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                  Available for new projects
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="neon-border rounded-lg bg-card p-6 md:p-8"
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 font-mono text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 font-mono text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="w-full resize-none rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20"
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="mt-1 font-mono text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === "sending"}
                  className="w-full"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 flex items-center gap-2 rounded-md border border-green-500/20 bg-green-500/5 px-4 py-3"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="font-mono text-xs text-green-400">
                      Message sent successfully! I&apos;ll get back to you soon.
                    </span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/5 px-4 py-3"
                  >
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <span className="font-mono text-xs text-red-400">
                      Something went wrong. Please try again.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
