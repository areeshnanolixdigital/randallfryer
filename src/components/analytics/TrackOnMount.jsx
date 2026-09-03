"use client";

// Fires one view event for the page or section it sits in. Renders nothing.
// Place it as the first child of the fragment or section it describes:
//
//   <TrackOnMount
//     event="IssuesView"
//     params={{ content_category: "issues", content_name: "platform_grid" }}
//   />
//
// `kind` selects the fbq method: "custom" (default) or "standard" — a standard
// name must be one Meta recognises (ViewContent, Lead, …) or it is dropped.
//
// `params` sits in the effect's dependency array, so a new object identity
// re-fires the event. Pass an object literal or a memoised object — never a
// value rebuilt on each render.

import { useEffect } from "react";

import { standardParams, trackMeta, trackStandard } from "@/lib/analytics/meta";

const TrackOnMount = ({ event, params = {}, kind = "custom" }) => {
  useEffect(() => {
    if (!event) return;
    const send = kind === "standard" ? trackStandard : trackMeta;
    send(event, standardParams(params));
  }, [event, params, kind]);

  return null;
};

export default TrackOnMount;
