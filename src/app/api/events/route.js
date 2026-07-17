import { fetchGHLEvents } from "@/lib/ghl";

// GET /api/events — all campaign events from the GHL custom object.
// Per ghl-events-integration.md §7. 60s ISR cache, degrades to [] on error.
export const revalidate = 60;

export async function GET() {
  try {
    const events = await fetchGHLEvents();
    return Response.json({ events, total: events.length });
  } catch (error) {
    console.error("[Events API]:", error);
    return Response.json({ events: [], total: 0 }, { status: 500 });
  }
}
