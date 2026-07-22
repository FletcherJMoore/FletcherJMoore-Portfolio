import prisma from "@/lib/db";
import { createProject, updateProject, deleteProject } from "../actions";
import { Field, Area, Select, SaveButton, DeleteButton } from "@/components/admin/Fields";

export const dynamic = "force-dynamic";

const ACCENTS = ["violet", "magenta", "cyan", "lime"];

export default async function ProjectsAdmin() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Projects</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        Showcase your work. Accent sets the card&apos;s top-border color.
      </p>

      <div className="mt-6 space-y-4">
        {projects.map((p) => (
          <div key={p.id} className="card p-5">
            <form action={updateProject} className="space-y-3">
              <input type="hidden" name="id" value={p.id} />
              <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
                <Field label="Name" name="name" defaultValue={p.name} />
                <Select label="Accent" name="accent" defaultValue={p.accent} options={ACCENTS} />
              </div>
              <Area label="Blurb" name="blurb" defaultValue={p.blurb} rows={2} />
              <Area label="Tags" name="tags" defaultValue={p.tags.join("\n")} rows={3} hint="one per line" />
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Live URL" name="link" defaultValue={p.link ?? ""} placeholder="https://…" />
                <Field label="Repo URL" name="repo" defaultValue={p.repo ?? ""} placeholder="https://…" />
                <Field label="Order" name="order" type="number" defaultValue={p.order} />
              </div>
              <SaveButton />
            </form>
            <form action={deleteProject} className="mt-3 flex justify-end border-t border-[var(--color-border)] pt-3">
              <input type="hidden" name="id" value={p.id} />
              <DeleteButton />
            </form>
          </div>
        ))}
      </div>

      <form action={createProject} className="card mt-6 space-y-3 border-dashed p-5">
        <h2 className="font-display text-lg font-bold">Add a project</h2>
        <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
          <Field label="Name" name="name" required />
          <Select label="Accent" name="accent" defaultValue="violet" options={ACCENTS} />
        </div>
        <Area label="Blurb" name="blurb" rows={2} />
        <Area label="Tags" name="tags" rows={3} hint="one per line" />
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Live URL" name="link" placeholder="https://…" />
          <Field label="Repo URL" name="repo" placeholder="https://…" />
          <Field label="Order" name="order" type="number" defaultValue={projects.length} />
        </div>
        <SaveButton>Add project</SaveButton>
      </form>
    </div>
  );
}
