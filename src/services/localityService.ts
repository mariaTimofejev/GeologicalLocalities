import type { Locality } from "@/types/locality";

// Public API endpoint for geological localities
const BASE_URL = "https://rwapi.geoloogia.info/api/v1/public/localities/";

// Public API endpoint for geological localities
interface FetchLocalitiesOptions {
  search?: string;
  country?: string;
  limit?: number;
  [key: string]: any; // allows API to evolve without breaking client
}

/**
 * Fetches localities from API using dynamic query params.
 * Designed to be reusable across list, search and detail views.
 */
export async function fetchLocalities(options: FetchLocalitiesOptions = {}): Promise<Locality[]> {
  try {

  // Build query string safely (handles encoding automatically)
    const params = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    const url = `${BASE_URL}?${params.toString()}`;
    const res = await fetch(url);

// Provide meaningful error for UI + debugging
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error: ${res.status} ${res.statusText} - ${text}`);
    }

// Typed response ensures Vue components remain type-safe
    return await res.json() as Locality[];
  } catch (err) {

// Centralized logging — keeps components clean
    console.error("Failed to fetch localities:", err);
    throw err; // rethrow so composables can handle UI state
  }
}