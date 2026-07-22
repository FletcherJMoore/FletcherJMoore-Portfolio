import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as d from "../src/lib/data";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Settings — upsert the single row so re-running is safe.
  await prisma.settings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      name: d.site.name,
      role: d.site.role,
      tagline: d.site.tagline,
      location: d.site.location,
      email: d.site.email,
      resumeUrl: d.site.resumeUrl,
      github: d.site.socials.github,
      linkedin: d.site.socials.linkedin,
      twitter: d.site.socials.twitter,
      careerGoals: d.careerGoals,
      aboutMe: d.aboutMe,
    },
  });

  // List tables — only seed when empty, so we never clobber your edits.
  if ((await prisma.stat.count()) === 0) {
    await prisma.stat.createMany({
      data: d.homeStats.map((s, i) => ({ ...s, order: i })),
    });
  }

  if ((await prisma.job.count()) === 0) {
    await prisma.job.createMany({
      data: d.experience.map((j, i) => ({
        company: j.company,
        title: j.title,
        period: j.period,
        location: j.location ?? "",
        summary: j.summary,
        highlights: j.highlights,
        order: i,
      })),
    });
  }

  if ((await prisma.project.count()) === 0) {
    await prisma.project.createMany({
      data: d.projects.map((p, i) => ({
        name: p.name,
        blurb: p.blurb,
        tags: p.tags,
        link: p.link ?? null,
        repo: p.repo ?? null,
        accent: p.accent,
        order: i,
      })),
    });
  }

  if ((await prisma.credential.count()) === 0) {
    await prisma.credential.createMany({
      data: d.credentials.map((c, i) => ({ ...c, order: i })),
    });
  }

  if ((await prisma.skillGroup.count()) === 0) {
    await prisma.skillGroup.createMany({
      data: d.skillGroups.map((g, i) => ({ ...g, order: i })),
    });
  }

  if ((await prisma.hobby.count()) === 0) {
    await prisma.hobby.createMany({
      data: d.hobbies.map((h, i) => ({ ...h, order: i })),
    });
  }

  if ((await prisma.funFact.count()) === 0) {
    await prisma.funFact.createMany({
      data: d.funFacts.map((text, i) => ({ text, order: i })),
    });
  }

  if ((await prisma.contactMethod.count()) === 0) {
    await prisma.contactMethod.createMany({
      data: d.contactMethods.map((m, i) => ({
        label: m.label,
        value: m.value,
        href: m.href,
        icon: m.icon,
        order: i,
      })),
    });
  }

  console.log("✅ Seed complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
