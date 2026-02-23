export interface Country {
  name: string;
}

export interface Locality {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: Country;
}