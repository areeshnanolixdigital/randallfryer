import { fetchGHLEvent } from "@/lib/ghl";

// GET /api/events/[id] — a single campaign event from the GHL custom object.
// Per ghl-events-integration.md §7. 60s ISR cache; 404 when not found.
export const revalidate = 60;

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const event = await fetchGHLEvent(id);
    return event
      ? Response.json({ event })
      : Response.json({ event: null }, { status: 404 });
  } catch (error) {
    console.error("[Event API]:", error);
    return Response.json({ event: null }, { status: 500 });
  }
}
