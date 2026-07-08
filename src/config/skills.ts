import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 98 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 88 },
      { name: "Vue.js", level: 80 },
      { name: "HTML / CSS", level: 95 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js / Express", level: 96 },
      { name: "Go", level: 90 },
      { name: "Python / FastAPI", level: 88 },
      { name: "PostgreSQL", level: 94 },
      { name: "Redis", level: 92 },
      { name: "GraphQL / REST", level: 95 },
      { name: "gRPC", level: 85 },
      { name: "Microservices", level: 93 },
    ],
  },
  {
    id: "devops",
    label: "Tools & DevOps",
    skills: [
      { name: "Docker / Kubernetes", level: 91 },
      { name: "AWS / GCP", level: 88 },
      { name: "CI/CD (GitHub Actions)", level: 94 },
      { name: "Terraform", level: 82 },
      { name: "Prometheus / Grafana", level: 86 },
      { name: "Git", level: 97 },
      { name: "Linux", level: 90 },
    ],
  },
];

export const backendApiResponse = {
  status: 200,
  message: "Developer profile retrieved successfully",
  data: {
    developer: "Heba Ashraf",
    role: "Full-Stack Engineer",
    specialization: "Backend Systems & API Design",
    skills: skillCategories.find((c) => c.id === "backend")!.skills,
    principles: [
      "Clean Architecture",
      "Domain-Driven Design",
      "Test-Driven Development",
      "12-Factor App Methodology",
    ],
    metrics: {
      apisDesigned: 47,
      uptime: "99.97%",
      avgResponseTime: "12ms",
    },
  },
};
