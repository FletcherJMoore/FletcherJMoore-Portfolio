"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { isAdmin, signOut } from "@/auth";

/* ---------------- helpers ---------------- */

async function guard() {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }
}

function str(fd: FormData, key: string): string {
  return ((fd.get(key) as string | null) ?? "").trim();
}
function num(fd: FormData, key: string): number {
  const n = parseInt(str(fd, key), 10);
  return Number.isFinite(n) ? n : 0;
}
/** Split a textarea (one item per line) into a clean string array. */
function lines(fd: FormData, key: string): string[] {
  return str(fd, key)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}
function nullable(fd: FormData, key: string): string | null {
  const v = str(fd, key);
  return v.length ? v : null;
}

function refresh() {
  // Public pages are dynamic, but revalidate everything for good measure.
  revalidatePath("/", "layout");
}

/* ---------------- auth ---------------- */

export async function logout() {
  await signOut({ redirectTo: "/admin/login" });
}

/* ---------------- settings ---------------- */

export async function updateSettings(fd: FormData) {
  await guard();
  const data = {
    name: str(fd, "name"),
    role: str(fd, "role"),
    tagline: str(fd, "tagline"),
    location: str(fd, "location"),
    email: str(fd, "email"),
    resumeUrl: str(fd, "resumeUrl"),
    github: str(fd, "github"),
    linkedin: str(fd, "linkedin"),
    twitter: str(fd, "twitter"),
    careerGoals: str(fd, "careerGoals"),
    aboutMe: str(fd, "aboutMe"),
  };
  await prisma.settings.upsert({
    where: { id: "main" },
    update: data,
    create: { id: "main", ...data },
  });
  refresh();
}

/* ---------------- stats ---------------- */

export async function createStat(fd: FormData) {
  await guard();
  await prisma.stat.create({
    data: { label: str(fd, "label"), value: str(fd, "value"), order: num(fd, "order") },
  });
  refresh();
}
export async function updateStat(fd: FormData) {
  await guard();
  await prisma.stat.update({
    where: { id: str(fd, "id") },
    data: { label: str(fd, "label"), value: str(fd, "value"), order: num(fd, "order") },
  });
  refresh();
}
export async function deleteStat(fd: FormData) {
  await guard();
  await prisma.stat.delete({ where: { id: str(fd, "id") } });
  refresh();
}

/* ---------------- jobs ---------------- */

export async function createJob(fd: FormData) {
  await guard();
  await prisma.job.create({
    data: {
      company: str(fd, "company"),
      title: str(fd, "title"),
      period: str(fd, "period"),
      location: str(fd, "location"),
      summary: str(fd, "summary"),
      highlights: lines(fd, "highlights"),
      order: num(fd, "order"),
    },
  });
  refresh();
}
export async function updateJob(fd: FormData) {
  await guard();
  await prisma.job.update({
    where: { id: str(fd, "id") },
    data: {
      company: str(fd, "company"),
      title: str(fd, "title"),
      period: str(fd, "period"),
      location: str(fd, "location"),
      summary: str(fd, "summary"),
      highlights: lines(fd, "highlights"),
      order: num(fd, "order"),
    },
  });
  refresh();
}
export async function deleteJob(fd: FormData) {
  await guard();
  await prisma.job.delete({ where: { id: str(fd, "id") } });
  refresh();
}

/* ---------------- projects ---------------- */

export async function createProject(fd: FormData) {
  await guard();
  await prisma.project.create({
    data: {
      name: str(fd, "name"),
      blurb: str(fd, "blurb"),
      tags: lines(fd, "tags"),
      link: nullable(fd, "link"),
      repo: nullable(fd, "repo"),
      accent: str(fd, "accent") || "violet",
      order: num(fd, "order"),
    },
  });
  refresh();
}
export async function updateProject(fd: FormData) {
  await guard();
  await prisma.project.update({
    where: { id: str(fd, "id") },
    data: {
      name: str(fd, "name"),
      blurb: str(fd, "blurb"),
      tags: lines(fd, "tags"),
      link: nullable(fd, "link"),
      repo: nullable(fd, "repo"),
      accent: str(fd, "accent") || "violet",
      order: num(fd, "order"),
    },
  });
  refresh();
}
export async function deleteProject(fd: FormData) {
  await guard();
  await prisma.project.delete({ where: { id: str(fd, "id") } });
  refresh();
}

/* ---------------- credentials ---------------- */

export async function createCredential(fd: FormData) {
  await guard();
  await prisma.credential.create({
    data: {
      title: str(fd, "title"),
      issuer: str(fd, "issuer"),
      year: str(fd, "year"),
      type: str(fd, "type") || "certification",
      order: num(fd, "order"),
    },
  });
  refresh();
}
export async function updateCredential(fd: FormData) {
  await guard();
  await prisma.credential.update({
    where: { id: str(fd, "id") },
    data: {
      title: str(fd, "title"),
      issuer: str(fd, "issuer"),
      year: str(fd, "year"),
      type: str(fd, "type") || "certification",
      order: num(fd, "order"),
    },
  });
  refresh();
}
export async function deleteCredential(fd: FormData) {
  await guard();
  await prisma.credential.delete({ where: { id: str(fd, "id") } });
  refresh();
}

/* ---------------- skill groups ---------------- */

export async function createSkillGroup(fd: FormData) {
  await guard();
  await prisma.skillGroup.create({
    data: { category: str(fd, "category"), skills: lines(fd, "skills"), order: num(fd, "order") },
  });
  refresh();
}
export async function updateSkillGroup(fd: FormData) {
  await guard();
  await prisma.skillGroup.update({
    where: { id: str(fd, "id") },
    data: { category: str(fd, "category"), skills: lines(fd, "skills"), order: num(fd, "order") },
  });
  refresh();
}
export async function deleteSkillGroup(fd: FormData) {
  await guard();
  await prisma.skillGroup.delete({ where: { id: str(fd, "id") } });
  refresh();
}

/* ---------------- hobbies ---------------- */

export async function createHobby(fd: FormData) {
  await guard();
  await prisma.hobby.create({
    data: {
      emoji: str(fd, "emoji"),
      title: str(fd, "title"),
      description: str(fd, "description"),
      order: num(fd, "order"),
    },
  });
  refresh();
}
export async function updateHobby(fd: FormData) {
  await guard();
  await prisma.hobby.update({
    where: { id: str(fd, "id") },
    data: {
      emoji: str(fd, "emoji"),
      title: str(fd, "title"),
      description: str(fd, "description"),
      order: num(fd, "order"),
    },
  });
  refresh();
}
export async function deleteHobby(fd: FormData) {
  await guard();
  await prisma.hobby.delete({ where: { id: str(fd, "id") } });
  refresh();
}

/* ---------------- fun facts ---------------- */

export async function createFunFact(fd: FormData) {
  await guard();
  await prisma.funFact.create({ data: { text: str(fd, "text"), order: num(fd, "order") } });
  refresh();
}
export async function updateFunFact(fd: FormData) {
  await guard();
  await prisma.funFact.update({
    where: { id: str(fd, "id") },
    data: { text: str(fd, "text"), order: num(fd, "order") },
  });
  refresh();
}
export async function deleteFunFact(fd: FormData) {
  await guard();
  await prisma.funFact.delete({ where: { id: str(fd, "id") } });
  refresh();
}

/* ---------------- contact methods ---------------- */

export async function createContactMethod(fd: FormData) {
  await guard();
  await prisma.contactMethod.create({
    data: {
      label: str(fd, "label"),
      value: str(fd, "value"),
      href: str(fd, "href"),
      icon: str(fd, "icon") || "mail",
      order: num(fd, "order"),
    },
  });
  refresh();
}
export async function updateContactMethod(fd: FormData) {
  await guard();
  await prisma.contactMethod.update({
    where: { id: str(fd, "id") },
    data: {
      label: str(fd, "label"),
      value: str(fd, "value"),
      href: str(fd, "href"),
      icon: str(fd, "icon") || "mail",
      order: num(fd, "order"),
    },
  });
  refresh();
}
export async function deleteContactMethod(fd: FormData) {
  await guard();
  await prisma.contactMethod.delete({ where: { id: str(fd, "id") } });
  refresh();
}
