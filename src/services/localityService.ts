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
export async function fetchLocalities(
  options: FetchLocalitiesOptions = {},
  signal?: AbortSignal
): Promise<Locality[]> {
  const params = new URLSearchParams();
  Object.entries(options).forEach(([k, v]) => {
    if (v != null) params.append(k, String(v));
  });
  const url = `${BASE_URL}?${params.toString()}`;
  const res = await fetch(url, signal ? { signal } : undefined);

  // Provide meaningful error for UI + debugging
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${res.status} ${res.statusText} - ${text}`);
  }

  // Typed response ensures Vue components remain type-safe
  return await res.json() as Locality[];
}

// helper for fetching a single locality by ID (used by detail view)
export async function fetchLocality(
  id: string,
  signal?: AbortSignal
): Promise<Locality> {
  const res = await fetch(`${BASE_URL}${id}/?expand=country`, signal ? { signal } : undefined);

  // Provide meaningful error for UI + debugging
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${res.status} ${res.statusText} - ${text}`);
  }

  return await res.json() as Locality;
}