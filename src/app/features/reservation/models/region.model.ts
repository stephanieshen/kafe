export interface Region {
  id: number;
  label: string;
  maxSize: number;
  isChildrenAllowed: boolean;
  isSmokingAllowed: boolean;
}

export interface RegionAvailability {
  region: Region;
  dates: Record<string, DateAvailability>;
}

export interface DateAvailability {
  times: string[];
  capacities: number[];
}

export interface SuggestedRegion {
  region: Region;
  availableSlots: number;
}

