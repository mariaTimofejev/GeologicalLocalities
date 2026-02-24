/**
 * Country returned by public geology API.
 * Kept minimal because API only guarantees name at the moment.
 * (Future-proof: additional fields can be added without breaking Locality)
 */
export interface Country {
  readonly name: string;
}

/**
 * Geological locality domain model used across the app.
 * Immutable (readonly) to prevent accidental UI mutation of API data.
 */
export interface Locality {

/** Unique identifier from API */
  readonly id: number;

/** Human readable locality name */
  readonly name: string;

/** WGS84 coordinates – used for map rendering (Leaflet) */
  readonly latitude: number;
  readonly longitude: number;

/** Optional because API sometimes omits related objects */
  readonly country?: Country;
}