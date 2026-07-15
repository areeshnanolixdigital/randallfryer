// Event listings are added by the campaign as they are scheduled.
// Until then, the Events page renders its "no events scheduled" state.
export const EVENTS = [];

export function getEvent(slug) {
  return EVENTS.find((e) => e.slug === slug);
}

export function getRelated(slug, limit = 3) {
  const idx = EVENTS.findIndex((e) => e.slug === slug);
  if (idx === -1) return EVENTS.slice(0, limit);
  const rest = [...EVENTS.slice(idx + 1), ...EVENTS.slice(0, idx)];
  return rest.slice(0, limit);
}
