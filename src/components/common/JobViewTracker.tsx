"use client";

import { useEffect } from "react";
import { trackJobView } from "@/app/actions/analytics";

export function JobViewTracker({ id }: { id: string }) {
  useEffect(() => {
    trackJobView(id);
  }, [id]);

  return null;
}
