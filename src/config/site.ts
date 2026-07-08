export const siteConfig = {
  name: "Heba Ashraf",
  title: "Full-Stack Developer",
  tagline: "Building robust systems with precision engineering",
  email: "hebaashraf81@gmail.com",
  secondaryEmail: "heba.a.nofal.55@gmail.com",
  emails: ["hebaashraf81@gmail.com", "heba.a.nofal.55@gmail.com"] as const,
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  location: "New Cairo, Egypt",
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
