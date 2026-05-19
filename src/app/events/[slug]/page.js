import { notFound } from "next/navigation";
import EventDetailPage from "@/sections/pages/EventDetailPage";
import { EVENTS, getEvent } from "@/data/events";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ev = getEvent(slug);
  if (!ev) return { title: "Event not found" };
  return {
    title: ev.title,
    description: ev.summary,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const ev = getEvent(slug);
  if (!ev) return notFound();
  return <EventDetailPage event={ev} />;
}
