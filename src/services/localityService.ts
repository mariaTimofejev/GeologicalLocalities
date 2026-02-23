// src/services/LocalityService.ts
import type { Locality } from "@/types/locality";

const BASE_URL = "https://rwapi.geoloogia.info/api/v1/public/localities/";

interface FetchLocalitiesOptions {
  search?: string;
  country?: string;
  limit?: number;
  [key: string]: any; // tulevikus uued parameetrid
}

export async function fetchLocalities(options: FetchLocalitiesOptions = {}): Promise<Locality[]> {
  try {
    const params = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    const url = `${BASE_URL}?${params.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error: ${res.status} ${res.statusText} - ${text}`);
    }

    return await res.json() as Locality[];
  } catch (err) {
    console.error("Failed to fetch localities:", err);
    throw err;
  }
}