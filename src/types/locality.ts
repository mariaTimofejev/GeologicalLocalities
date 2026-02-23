export interface Country {
  readonly name: string;
}

export interface Locality {
  readonly id: number;
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly country?: Country;
}