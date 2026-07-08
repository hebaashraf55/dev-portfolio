"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { backendApiResponse } from "@/config/skills";

export function ApiSimulation() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const [responseVisible, setResponseVisible] = useState(false);

  const handleSendRequest = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setHasSent(false);
    setResponseVisible(false);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsLoading(false);
    setHasSent(true);
    setResponseVisible(true);
  };

  const requestBody = {
    method: "GET",
    endpoint: "/api/v1/developer",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer sk_live_••••••••",
    },
    body: {
      query: "profile",
      fields: ["skills", "principles", "metrics"],
    },
  };

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-2">
      {/* Request Panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="neon-border flex flex-col rounded-lg bg-card"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Request
          </span>
          <span className="rounded-md bg-neon-purple/10 px-2 py-0.5 font-mono text-[10px] text-neon-purple">
            POST
          </span>
        </div>
        <div className="flex-1 p-4">
          <div className="mb-3 font-mono text-sm text-neon-cyan">
            /api/v1/developer
          </div>
          <pre className="overflow-x-auto rounded-md bg-background p-4 font-mono text-xs leading-relaxed text-muted">
            {JSON.stringify(requestBody, null, 2)}
          </pre>
        </div>
        <div className="border-t border-border p-4">
          <motion.button
            onClick={handleSendRequest}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-neon-cyan/30 bg-neon-cyan/10 py-2.5 font-mono text-sm text-neon-cyan transition-all hover:border-neon-cyan/60 hover:bg-neon-cyan/20 hover:shadow-[0_0_20px_rgba(0,245,255,0.15)] disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Request
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Response Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="neon-border flex flex-col rounded-lg bg-card"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Response
          </span>
          <AnimatePresence mode="wait">
            {hasSent ? (
              <motion.span
                key="status"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 rounded-md bg-green-500/10 px-2 py-0.5 font-mono text-[10px] text-green-400"
              >
                <CheckCircle2 className="h-3 w-3" />
                200 OK
              </motion.span>
            ) : (
              <motion.span
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-md bg-border px-2 py-0.5 font-mono text-[10px] text-muted"
              >
                Waiting...
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="relative flex-1 p-4">
          <AnimatePresence mode="wait">
            {responseVisible ? (
              <motion.div
                key="response"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-3 flex items-center gap-3 font-mono text-xs text-muted">
                  <span>{backendApiResponse.data.metrics.avgResponseTime}</span>
                  <span className="text-border">|</span>
                  <span>{backendApiResponse.data.metrics.uptime} uptime</span>
                </div>
                <pre className="max-h-80 overflow-x-auto overflow-y-auto rounded-md bg-background p-4 font-mono text-xs leading-relaxed">
                  <code>
                    <span className="text-muted">{"{"}</span>
                    {"\n"}
                    <span className="text-neon-purple">
                      {'  "status"'}
                    </span>
                    <span className="text-muted">: </span>
                    <span className="text-green-400">200</span>
                    <span className="text-muted">,</span>
                    {"\n"}
                    <span className="text-neon-purple">
                      {'  "data"'}
                    </span>
                    <span className="text-muted">: {"{"}</span>
                    {"\n"}
                    <span className="text-neon-cyan">
                      {'    "developer"'}
                    </span>
                    <span className="text-muted">: </span>
                    <span className="text-foreground">
                      &quot;{backendApiResponse.data.developer}&quot;
                    </span>
                    <span className="text-muted">,</span>
                    {"\n"}
                    <span className="text-neon-cyan">
                      {'    "specialization"'}
                    </span>
                    <span className="text-muted">: </span>
                    <span className="text-foreground">
                      &quot;{backendApiResponse.data.specialization}&quot;
                    </span>
                    <span className="text-muted">,</span>
                    {"\n"}
                    <span className="text-neon-cyan">
                      {'    "skills"'}
                    </span>
                    <span className="text-muted">: [</span>
                    {"\n"}
                    {backendApiResponse.data.skills.map((skill, i) => (
                      <span key={skill.name}>
                        <span className="text-muted">{"      "}</span>
                        <span className="text-foreground">
                          {`{ "name": "${skill.name}", "level": ${skill.level} }`}
                        </span>
                        {i < backendApiResponse.data.skills.length - 1 && (
                          <span className="text-muted">,</span>
                        )}
                        {"\n"}
                      </span>
                    ))}
                    <span className="text-muted">{"    ],"}</span>
                    {"\n"}
                    <span className="text-neon-cyan">
                      {'    "principles"'}
                    </span>
                    <span className="text-muted">: [</span>
                    {backendApiResponse.data.principles.map((p, i) => (
                      <span key={p} className="text-foreground">
                        &quot;{p}&quot;
                        {i < backendApiResponse.data.principles.length - 1
                          ? ", "
                          : ""}
                      </span>
                    ))}
                    <span className="text-muted">]</span>
                    {"\n"}
                    <span className="text-muted">{"  }"}</span>
                    {"\n"}
                    <span className="text-muted">{"}"}</span>
                  </code>
                </pre>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-48 items-center justify-center"
              >
                <div className="text-center">
                  <AlertCircle className="mx-auto mb-3 h-8 w-8 text-border" />
                  <p className="font-mono text-xs text-muted">
                    Send a request to see the response
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
