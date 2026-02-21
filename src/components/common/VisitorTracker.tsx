"use client";

import { useEffect } from "react";
import { trackVisitor } from "@/app/actions/analytics";

export function VisitorTracker() {
  useEffect(() => {
    // Track visitor once on mount
    trackVisitor();
  }, []);

  return null;
}
