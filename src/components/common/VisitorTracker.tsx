"use client";

import { useEffect } from "react";

export function VisitorTracker() {
  useEffect(() => {
    // Visitor tracking - silently attempt to track
    const track = async () => {
      try {
        const { trackVisitor } = await import("@/app/actions/analytics");
        await trackVisitor();
      } catch {
        // Silently fail - analytics should not break the app
      }
    };
    track();
  }, []);

  return null;
}
