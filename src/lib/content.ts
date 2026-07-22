import "server-only";
import prisma from "./db";
import * as defaults from "./data";

/*
  Data-access layer. Every public page reads through these helpers so the
  live site always reflects the database. If the DB is empty (before the
  first seed) or unreachable, we fall back to the placeholder defaults in
  data.ts so the site never hard-crashes.
*/

export type SiteSettings = typeof defaults.site & {
  careerGoals: string;
  aboutMe: string;
};

const settingsFallback: SiteSettings = {
  ...defaults.site,
  careerGoals: defaults.careerGoals,
  aboutMe: defaults.aboutMe,
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    const row = await prisma.settings.findFirst();
    if (!row) return settingsFallback;
    return {
      name: row.name,
      role: row.role,
      tagline: row.tagline,
      location: row.location,
      email: row.email,
      resumeUrl: row.resumeUrl,
      careerGoals: row.careerGoals,
      aboutMe: row.aboutMe,
      socials: {
        github: row.github,
        linkedin: row.linkedin,
        twitter: row.twitter,
      },
    };
  } catch {
    return settingsFallback;
  }
}

export async function getStats() {
  try {
    const rows = await prisma.stat.findMany({ orderBy: { order: "asc" } });
    return rows.length ? rows : defaults.homeStats;
  } catch {
    return defaults.homeStats;
  }
}

export async function getExperience() {
  try {
    const rows = await prisma.job.findMany({ orderBy: { order: "asc" } });
    return rows.length ? rows : defaults.experience;
  } catch {
    return defaults.experience;
  }
}

export async function getProjects() {
  try {
    const rows = await prisma.project.findMany({ orderBy: { order: "asc" } });
    return rows.length ? rows : defaults.projects;
  } catch {
    return defaults.projects;
  }
}

export async function getCredentials() {
  try {
    const rows = await prisma.credential.findMany({
      orderBy: { order: "asc" },
    });
    return rows.length ? rows : defaults.credentials;
  } catch {
    return defaults.credentials;
  }
}

export async function getSkillGroups() {
  try {
    const rows = await prisma.skillGroup.findMany({
      orderBy: { order: "asc" },
    });
    return rows.length ? rows : defaults.skillGroups;
  } catch {
    return defaults.skillGroups;
  }
}

export async function getHobbies() {
  try {
    const rows = await prisma.hobby.findMany({ orderBy: { order: "asc" } });
    return rows.length ? rows : defaults.hobbies;
  } catch {
    return defaults.hobbies;
  }
}

export async function getFunFacts() {
  try {
    const rows = await prisma.funFact.findMany({ orderBy: { order: "asc" } });
    return rows.length ? rows.map((f) => f.text) : defaults.funFacts;
  } catch {
    return defaults.funFacts;
  }
}

export async function getContactMethods() {
  try {
    const rows = await prisma.contactMethod.findMany({
      orderBy: { order: "asc" },
    });
    return rows.length ? rows : defaults.contactMethods;
  } catch {
    return defaults.contactMethods;
  }
}
