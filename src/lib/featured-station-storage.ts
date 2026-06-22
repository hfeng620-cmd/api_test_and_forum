import type { HomeFeaturedStation } from "@/lib/site-data";

export const FEATURED_STATION_STORAGE_KEY = "timin-featured-stations-copy";

export function loadFeaturedStationDrafts(): HomeFeaturedStation[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const saved = window.localStorage.getItem(FEATURED_STATION_STORAGE_KEY);
    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved) as HomeFeaturedStation[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

export function saveFeaturedStationDrafts(stations: HomeFeaturedStation[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    FEATURED_STATION_STORAGE_KEY,
    JSON.stringify(stations),
  );
}

export function clearFeaturedStationDrafts() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(FEATURED_STATION_STORAGE_KEY);
}
