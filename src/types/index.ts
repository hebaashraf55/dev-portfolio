export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  level?: number;
}

export interface SkillCategory {
  id: "frontend" | "backend" | "devops";
  label: string;
  skills: Skill[];
}

export type FormStatus = "idle" | "sending" | "success" | "error";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
