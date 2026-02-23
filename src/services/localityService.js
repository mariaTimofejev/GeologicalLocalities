const BASE = "https://rwapi.geoloogia.info/api/v1/public/localities/";

export async function fetchLocalities(params = "") {
  const res = await fetch(`${BASE}${params}`);
  if (!res.ok) throw new Error("API error");
  return await res.json();
}