type GeoLookup = {
    continent_code: string;
    country_a2: string;
    country_a3: string;
    region_code: string;
    state_code: string;
  }
  
  // Use that specific interface as the return type
  declare module 'geojson-places' {
    export function lookUp(latitude: number, longitude: number): GeoLookup | null;
  }