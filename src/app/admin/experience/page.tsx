import prisma from "@/lib/db";
import { createJob, updateJob, deleteJob } from "../actions";
import { Field, Area, SaveButton, DeleteButton } from "@/components/admin/Fields";

export const dynamic = "force-dynamic";

export default async function ExperienceAdmin() {
  const jobs = await prisma.job.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Experience</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        Your work history timeline. Lower order numbers show first.
      </p>

      <div className="mt-6 space-y-4">
        {jobs.map((j) => (
          <div key={j.id} className="card p-5">
            <form action={updateJob} className="space-y-3">
              <input type="hidden" name="id" value={j.id} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Job title" name="title" defaultValue={j.title} />
                <Field label="Company" name="company" defaultValue={j.company} />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Period" name="period" defaultValue={j.period} placeholder="2023 — Present" />
                <Field label="Location" name="location" defaultValue={j.location} />
                <Field label="Order" name="order" type="number" defaultValue={j.order} />
              </div>
              <Area label="Summary" name="summary" defaultValue={j.summary} rows={2} />
              <Area
                label="Highlights"
                name="highlights"
                defaultValue={j.highlights.join("\n")}
                rows={4}
                hint="one per line"
              />
              <SaveButton />
            </form>
            <form action={deleteJob} className="mt-3 flex justify-end border-t border-[var(--color-border)] pt-3">
              <input type="hidden" name="id" value={j.id} />
              <DeleteButton />
            </form>
          </div>
        ))}
      </div>

      <form action={createJob} className="card mt-6 space-y-3 border-dashed p-5">
        <h2 className="font-display text-lg font-bold">Add a job</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Job title" name="title" required />
          <Field label="Company" name="company" required />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Period" name="period" placeholder="2023 — Present" />
          <Field label="Location" name="location" />
          <Field label="Order" name="order" type="number" defaultValue={jobs.length} />
        </div>
        <Area label="Summary" name="summary" rows={2} />
        <Area label="Highlights" name="highlights" rows={4} hint="one per line" />
        <SaveButton>Add job</SaveButton>
      </form>
    </div>
  );
}
