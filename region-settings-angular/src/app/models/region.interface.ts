export interface City {
  id: string;
  name: string;
  flag: string;
  countryCode: string;
  isEnabled: boolean;
  isBaseRegion: boolean;
}

export interface Region {
  id: string;
  name: string;
  isExpanded: boolean;
  isSelected: boolean;
  cities: City[];
}

export interface RegionStats {
  enabledCount: number;
  baseCount: number;
  totalCount: number;
}

export interface RegionState {
  regions: Region[];
  searchTerm: string;
  globalStats: {
    enabled: RegionStats;
    base: RegionStats;
  };
}
