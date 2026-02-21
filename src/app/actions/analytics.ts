"use server";

import { incrementVisitorCount, incrementJobViewCount } from "@/lib/analytics";

export async function trackVisitor() {
  incrementVisitorCount();
}

export async function trackJobView(id: string) {
  incrementJobViewCount(id);
}
