import { getSettings } from "@/lib/content";
import { updateSettings } from "../actions";
import { Field, Area, SaveButton } from "@/components/admin/Fields";

export const dynamic = "force-dynamic";

export default async function SettingsAdmin() {
  const s = await getSettings();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Settings</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        Your core identity, bio, and links — shown across the whole site.
      </p>

      <form action={updateSettings} className="card mt-6 space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" defaultValue={s.name} required />
          <Field label="Professional title" name="role" defaultValue={s.role} />
        </div>
        <Area label="Tagline" name="tagline" defaultValue={s.tagline} rows={2} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Location" name="location" defaultValue={s.location} />
          <Field label="Email" name="email" type="email" defaultValue={s.email} />
        </div>
        <Field
          label="Résumé PDF path or URL"
          name="resumeUrl"
          defaultValue={s.resumeUrl}
          placeholder="/resume.pdf"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="GitHub URL" name="github" defaultValue={s.socials.github} />
          <Field label="LinkedIn URL" name="linkedin" defaultValue={s.socials.linkedin} />
          <Field label="Twitter/X URL" name="twitter" defaultValue={s.socials.twitter} />
        </div>
        <Area
          label="Career goals"
          name="careerGoals"
          defaultValue={s.careerGoals}
          rows={4}
          hint="Shown on the Professional page"
        />
        <Area
          label="About me"
          name="aboutMe"
          defaultValue={s.aboutMe}
          rows={5}
          hint="Shown on the Personal page"
        />
        <SaveButton>Save settings</SaveButton>
      </form>
    </div>
  );
}
