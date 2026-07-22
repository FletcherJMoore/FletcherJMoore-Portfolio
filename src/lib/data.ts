/* ============================================================
   YOUR CONTENT LIVES HERE
   ------------------------------------------------------------
   Edit the values below to make the whole site yours. Every
   page reads from this file, so you rarely need to touch the
   components. Replace the placeholder text, links, and lists.
   ============================================================ */

export const site = {
  name: "Fletcher Moore",
  role: "Your Professional Title",
  tagline:
    "A short, punchy one-liner about who you are and the value you bring.",
  location: "City, State",
  email: "fletcherjmoore14@gmail.com",
  // Path to your resume PDF placed in the /public folder.
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
    twitter: "https://x.com/yourhandle",
  },
};

/* ---------------- HOME highlights ---------------- */
export const homeStats: { label: string; value: string }[] = [
  { label: "Years experience", value: "5+" },
  { label: "Projects shipped", value: "20+" },
  { label: "Certifications", value: "4" },
  { label: "Cups of coffee", value: "∞" },
];

/* ---------------- PROFESSIONAL ---------------- */

export const careerGoals =
  "Describe where you're headed: the kind of role, impact, or problems you want to work on next. Keep it aspirational but concrete.";

export type Job = {
  company: string;
  title: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
};

export const experience: Job[] = [
  {
    company: "Current Company",
    title: "Your Current Role",
    period: "2023 — Present",
    location: "City, State",
    summary:
      "One or two sentences on your scope and what the team does.",
    highlights: [
      "Quantified win — e.g. improved X by 30% by doing Y.",
      "A key project you led or contributed to.",
      "A skill or system you own.",
    ],
  },
  {
    company: "Previous Company",
    title: "Earlier Role",
    period: "2021 — 2023",
    location: "City, State",
    summary: "What you were responsible for here.",
    highlights: [
      "Notable achievement with a number attached.",
      "A collaboration or leadership moment.",
    ],
  },
  {
    company: "First Company",
    title: "Where It Started",
    period: "2019 — 2021",
    location: "City, State",
    summary: "The role that got you going.",
    highlights: ["Foundational skill you built.", "Early win."],
  },
];

export type Project = {
  name: string;
  blurb: string;
  tags: string[];
  link?: string;
  repo?: string;
  accent: "violet" | "magenta" | "cyan" | "lime";
};

export const projects: Project[] = [
  {
    name: "Project One",
    blurb:
      "A sentence or two on what it does, the problem it solves, and your role in building it.",
    tags: ["Next.js", "TypeScript", "API"],
    link: "https://example.com",
    repo: "https://github.com/yourhandle/project-one",
    accent: "violet",
  },
  {
    name: "Project Two",
    blurb:
      "Highlight the impact and any interesting technical challenge you solved.",
    tags: ["Python", "Data", "Automation"],
    repo: "https://github.com/yourhandle/project-two",
    accent: "magenta",
  },
  {
    name: "Project Three",
    blurb: "Show range — a different kind of project or stack.",
    tags: ["Design", "React", "UX"],
    link: "https://example.com",
    accent: "cyan",
  },
  {
    name: "Project Four",
    blurb: "A side project, open-source contribution, or experiment.",
    tags: ["Cloud", "DevOps"],
    repo: "https://github.com/yourhandle/project-four",
    accent: "lime",
  },
];

export type Credential = {
  title: string;
  issuer: string;
  year: string;
  type: "education" | "certification";
};

export const credentials: Credential[] = [
  {
    title: "B.S. in Your Field",
    issuer: "Your University",
    year: "2019",
    type: "education",
  },
  {
    title: "Relevant Certification",
    issuer: "Issuing Body",
    year: "2023",
    type: "certification",
  },
  {
    title: "Another Certification",
    issuer: "Issuing Body",
    year: "2022",
    type: "certification",
  },
  {
    title: "Bootcamp / Course",
    issuer: "Provider",
    year: "2021",
    type: "education",
  },
];

export type SkillGroup = { category: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "SQL"],
  },
  {
    category: "Frameworks & Tools",
    skills: ["React", "Next.js", "Node.js", "Tailwind"],
  },
  {
    category: "Platforms",
    skills: ["AWS", "Docker", "Git", "Vercel"],
  },
  {
    category: "Strengths",
    skills: ["Communication", "Problem-solving", "Leadership"],
  },
];

/* ---------------- PERSONAL ---------------- */

export const aboutMe =
  "Write a warm, first-person paragraph here. Where you're from, what lights you up, what you're like to work with, and a detail that makes you memorable. This is the human behind the résumé.";

export type Interest = {
  emoji: string;
  title: string;
  description: string;
};

export const hobbies: Interest[] = [
  {
    emoji: "🎸",
    title: "A Hobby",
    description: "A line about what you love about it.",
  },
  {
    emoji: "📷",
    title: "Another Hobby",
    description: "What draws you to this one.",
  },
  {
    emoji: "🥾",
    title: "Something Active",
    description: "Where it takes you.",
  },
  {
    emoji: "📚",
    title: "Something Curious",
    description: "What you're into lately.",
  },
  {
    emoji: "🎮",
    title: "For Fun",
    description: "How you unwind.",
  },
  {
    emoji: "✈️",
    title: "A Passion",
    description: "The thing you'd talk about for hours.",
  },
];

export const funFacts: string[] = [
  "A surprising fact about you.",
  "Somewhere you've lived or traveled.",
  "A skill people don't expect.",
  "Your go-to comfort food.",
];

/* ---------------- CONTACT ---------------- */

export const contactMethods: {
  label: string;
  value: string;
  href: string;
  icon: "mail" | "linkedin" | "github" | "location";
}[] = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: "mail",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/yourhandle",
    href: site.socials.linkedin,
    icon: "linkedin",
  },
  {
    label: "GitHub",
    value: "github.com/yourhandle",
    href: site.socials.github,
    icon: "github",
  },
  {
    label: "Location",
    value: site.location,
    href: "#",
    icon: "location",
  },
];
