import { notFound } from "next/navigation";
import EventDetailPage from "@/sections/pages/EventDetailPage";
import { fetchGHLEvent, fetchGHLEvents } from "@/lib/ghl";
import { adaptGhlEvent, adaptGhlEvents } from "@/data/events";

// The slug is the GHL custom-object record id. Rendered on demand and cached
// for 60s (matches fetchGHLEvent's revalidate) — no generateStaticParams since
// events are managed in GHL, not at build time.
export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ev = adaptGhlEvent(await fetchGHLEvent(slug));
  if (!ev) return { title: "Event not found" };
  return {
    title: ev.title,
    description: ev.summary,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const ev = adaptGhlEvent(await fetchGHLEvent(slug));
  if (!ev) return notFound();

  const all = adaptGhlEvents(await fetchGHLEvents());
  const related = all.filter((e) => e.slug !== ev.slug).slice(0, 3);

  return <EventDetailPage event={ev} related={related} />;
}
