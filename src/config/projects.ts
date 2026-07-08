import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "distributed-api-gateway",
    title: "Distributed API Gateway",
    description:
      "High-throughput API gateway with rate limiting, JWT auth, and Redis-backed caching. Handles 50K+ req/min with sub-10ms latency.",
    tags: ["Go", "Redis", "gRPC", "Kubernetes"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "realtime-analytics",
    title: "Real-Time Analytics Engine",
    description:
      "Event-driven analytics pipeline processing millions of events per day. Kafka streams, PostgreSQL aggregations, and a React dashboard.",
    tags: ["TypeScript", "Kafka", "PostgreSQL", "Next.js"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "microservices-platform",
    title: "Microservices Platform",
    description:
      "Containerized microservices architecture with service mesh, distributed tracing, and automated CI/CD pipelines.",
    tags: ["Docker", "Istio", "GraphQL", "AWS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "auth-service",
    title: "OAuth2 Auth Service",
    description:
      "Production-grade authentication microservice with OAuth2, OIDC, MFA, and session management. Zero-downtime deployments.",
    tags: ["Node.js", "OAuth2", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "devops-dashboard",
    title: "DevOps Command Center",
    description:
      "Unified monitoring dashboard aggregating metrics from Prometheus, Grafana, and custom health checks across 40+ services.",
    tags: ["React", "Prometheus", "WebSockets", "Tailwind"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "serverless-etl",
    title: "Serverless ETL Pipeline",
    description:
      "Event-triggered ETL pipeline using AWS Lambda, S3, and Step Functions. Processes 2TB+ of data monthly with auto-scaling.",
    tags: ["Python", "AWS Lambda", "S3", "Step Functions"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];
