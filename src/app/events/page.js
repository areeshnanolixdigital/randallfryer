import EventsPage from "@/sections/pages/EventsPage";
import { fetchGHLEvents } from "@/lib/ghl";
import { adaptGhlEvents, splitEventsByDate } from "@/data/events";

export const metadata = {
  title: "Events",
  description:
    "Town halls, neighborhood gatherings, canvasses, and community events every Team Fryer event is open to the public. Bring your questions. Bring a neighbor.",
};

// Match the 60s ISR cache used by fetchGHLEvents / the /api/events route.
export const revalidate = 60;

export default async function Page() {
  const events = adaptGhlEvents(await fetchGHLEvents());
  // Bucket in the data layer (recomputed every ISR revalidate) so the time
  // read stays out of React render.
  const { upcoming, past } = splitEventsByDate(events);
  return <EventsPage upcoming={upcoming} past={past} />;
}
