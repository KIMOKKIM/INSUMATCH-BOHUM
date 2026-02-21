// Simple in-memory store for demo purposes
// In a real app, this would be a database

interface AnalyticsStore {
  visitorCount: number;
  jobViews: Record<string, number>;
}

// Initialize with some mock data so it doesn't look empty
const initialStore: AnalyticsStore = {
  visitorCount: 3456,
  jobViews: {
    "p1": 120,
    "p2": 85,
    "s1": 45,
    "s2": 32,
    "g1": 15,
    "g2": 12,
  }
};

// Use global to persist across hot reloads in development
const globalStore = global as unknown as { analyticsStore: AnalyticsStore };
if (!globalStore.analyticsStore) {
  globalStore.analyticsStore = initialStore;
}

export const getVisitorCount = () => {
  return globalStore.analyticsStore.visitorCount;
};

export const incrementVisitorCount = () => {
  globalStore.analyticsStore.visitorCount += 1;
  return globalStore.analyticsStore.visitorCount;
};

export const getJobViewCount = (id: string) => {
  return globalStore.analyticsStore.jobViews[id] || 0;
};

export const incrementJobViewCount = (id: string) => {
  const current = globalStore.analyticsStore.jobViews[id] || 0;
  globalStore.analyticsStore.jobViews[id] = current + 1;
  return current + 1;
};
