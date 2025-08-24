import { Injectable } from '@angular/core';
import { Region, City } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RegionDataService {

  constructor() { }

  /**
   * Get all regions with realistic city data
   */
  getAllRegions(): Region[] {
    return [
      {
        id: 'europe',
        name: 'Europe',
        isExpanded: true,
        isSelected: true,
        cities: [
          { id: 'amsterdam', name: 'Amsterdam', flag: '🇳🇱', countryCode: 'NL', isEnabled: true, isBaseRegion: true },
          { id: 'berlin', name: 'Berlin', flag: '🇩🇪', countryCode: 'DE', isEnabled: true, isBaseRegion: false },
          { id: 'paris', name: 'Paris', flag: '🇫🇷', countryCode: 'FR', isEnabled: true, isBaseRegion: false },
          { id: 'rome', name: 'Rome', flag: '🇮🇹', countryCode: 'IT', isEnabled: true, isBaseRegion: false },
          { id: 'london', name: 'London', flag: '🇬🇧', countryCode: 'GB', isEnabled: false, isBaseRegion: false },
          { id: 'madrid', name: 'Madrid', flag: '🇪🇸', countryCode: 'ES', isEnabled: true, isBaseRegion: false },
          { id: 'vienna', name: 'Vienna', flag: '🇦🇹', countryCode: 'AT', isEnabled: true, isBaseRegion: false },
          { id: 'copenhagen', name: 'Copenhagen', flag: '🇩🇰', countryCode: 'DK', isEnabled: false, isBaseRegion: false }
        ]
      },
      {
        id: 'north-america',
        name: 'North America',
        isExpanded: false,
        isSelected: false,
        cities: [
          { id: 'new-york', name: 'New York', flag: '🇺🇸', countryCode: 'US', isEnabled: false, isBaseRegion: false },
          { id: 'los-angeles', name: 'Los Angeles', flag: '🇺🇸', countryCode: 'US', isEnabled: false, isBaseRegion: false },
          { id: 'chicago', name: 'Chicago', flag: '🇺🇸', countryCode: 'US', isEnabled: false, isBaseRegion: false },
          { id: 'toronto', name: 'Toronto', flag: '🇨🇦', countryCode: 'CA', isEnabled: false, isBaseRegion: false },
          { id: 'vancouver', name: 'Vancouver', flag: '🇨🇦', countryCode: 'CA', isEnabled: false, isBaseRegion: false },
          { id: 'mexico-city', name: 'Mexico City', flag: '🇲🇽', countryCode: 'MX', isEnabled: false, isBaseRegion: false }
        ]
      },
      {
        id: 'asia',
        name: 'Asia',
        isExpanded: false,
        isSelected: false,
        cities: [
          { id: 'tokyo', name: 'Tokyo', flag: '🇯🇵', countryCode: 'JP', isEnabled: false, isBaseRegion: false },
          { id: 'singapore', name: 'Singapore', flag: '🇸🇬', countryCode: 'SG', isEnabled: false, isBaseRegion: false },
          { id: 'seoul', name: 'Seoul', flag: '🇰🇷', countryCode: 'KR', isEnabled: false, isBaseRegion: false },
          { id: 'mumbai', name: 'Mumbai', flag: '🇮🇳', countryCode: 'IN', isEnabled: false, isBaseRegion: false },
          { id: 'hong-kong', name: 'Hong Kong', flag: '🇭🇰', countryCode: 'HK', isEnabled: false, isBaseRegion: false },
          { id: 'bangkok', name: 'Bangkok', flag: '🇹🇭', countryCode: 'TH', isEnabled: false, isBaseRegion: false },
          { id: 'shanghai', name: 'Shanghai', flag: '🇨🇳', countryCode: 'CN', isEnabled: false, isBaseRegion: false }
        ]
      },
      {
        id: 'africa',
        name: 'Africa',
        isExpanded: false,
        isSelected: false,
        cities: [
          { id: 'cape-town', name: 'Cape Town', flag: '🇿🇦', countryCode: 'ZA', isEnabled: false, isBaseRegion: false },
          { id: 'cairo', name: 'Cairo', flag: '🇪🇬', countryCode: 'EG', isEnabled: false, isBaseRegion: false },
          { id: 'lagos', name: 'Lagos', flag: '🇳🇬', countryCode: 'NG', isEnabled: false, isBaseRegion: false },
          { id: 'nairobi', name: 'Nairobi', flag: '🇰🇪', countryCode: 'KE', isEnabled: false, isBaseRegion: false },
          { id: 'casablanca', name: 'Casablanca', flag: '🇲🇦', countryCode: 'MA', isEnabled: false, isBaseRegion: false }
        ]
      },
      {
        id: 'oceania',
        name: 'Oceania',
        isExpanded: false,
        isSelected: false,
        cities: [
          { id: 'sydney', name: 'Sydney', flag: '🇦🇺', countryCode: 'AU', isEnabled: false, isBaseRegion: false },
          { id: 'melbourne', name: 'Melbourne', flag: '🇦🇺', countryCode: 'AU', isEnabled: false, isBaseRegion: false },
          { id: 'auckland', name: 'Auckland', flag: '🇳🇿', countryCode: 'NZ', isEnabled: false, isBaseRegion: false },
          { id: 'brisbane', name: 'Brisbane', flag: '🇦🇺', countryCode: 'AU', isEnabled: false, isBaseRegion: false }
        ]
      }
    ];
  }

  /**
   * Get a specific region by ID
   */
  getRegionById(regionId: string): Region | undefined {
    return this.getAllRegions().find(region => region.id === regionId);
  }

  /**
   * Get a specific city by ID across all regions
   */
  getCityById(cityId: string): { region: Region; city: City } | undefined {
    for (const region of this.getAllRegions()) {
      const city = region.cities.find(c => c.id === cityId);
      if (city) {
        return { region, city };
      }
    }
    return undefined;
  }

  /**
   * Get all cities across all regions
   */
  getAllCities(): City[] {
    return this.getAllRegions().flatMap(region => region.cities);
  }

  /**
   * Get cities by region ID
   */
  getCitiesByRegion(regionId: string): City[] {
    const region = this.getRegionById(regionId);
    return region ? region.cities : [];
  }
}