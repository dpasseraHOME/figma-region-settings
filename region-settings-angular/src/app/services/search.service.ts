import { Injectable } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { Region, City } from '../models';
import { RegionStateService } from './region-state.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private regionStateService: RegionStateService) { }

  /**
   * Get filtered regions based on search term
   */
  getFilteredRegions(): Observable<Region[]> {
    return combineLatest([
      this.regionStateService.regions$,
      this.regionStateService.searchTerm$
    ]).pipe(
      map(([regions, searchTerm]) => this.filterRegions(regions, searchTerm))
    );
  }

  /**
   * Filter regions and cities based on search term
   */
  private filterRegions(regions: Region[], searchTerm: string): Region[] {
    if (!searchTerm.trim()) {
      return regions;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    return regions.map(region => {
      const regionMatches = region.name.toLowerCase().includes(lowerSearchTerm);
      const filteredCities = region.cities.filter(city => 
        city.name.toLowerCase().includes(lowerSearchTerm) || 
        city.countryCode.toLowerCase().includes(lowerSearchTerm)
      );

      // Show region if:
      // 1. Region name matches, OR
      // 2. At least one city matches
      if (regionMatches || filteredCities.length > 0) {
        return {
          ...region,
          cities: regionMatches ? region.cities : filteredCities
        };
      }

      // Return region with empty cities if no match (will be filtered out in component)
      return {
        ...region,
        cities: []
      };
    }).filter(region => {
      // Only return regions that have cities or match themselves
      return region.cities.length > 0 || 
             region.name.toLowerCase().includes(lowerSearchTerm);
    });
  }

  /**
   * Search for specific city across all regions
   */
  findCity(cityName: string): Observable<{ region: Region; city: City } | null> {
    return this.regionStateService.regions$.pipe(
      map(regions => {
        const lowerCityName = cityName.toLowerCase();
        
        for (const region of regions) {
          const city = region.cities.find(c => 
            c.name.toLowerCase().includes(lowerCityName) ||
            c.id.toLowerCase().includes(lowerCityName)
          );
          if (city) {
            return { region, city };
          }
        }
        return null;
      })
    );
  }

  /**
   * Get search suggestions based on current input
   */
  getSearchSuggestions(searchTerm: string): Observable<string[]> {
    return this.regionStateService.regions$.pipe(
      map(regions => {
        if (!searchTerm.trim()) {
          return [];
        }

        const lowerSearchTerm = searchTerm.toLowerCase();
        const suggestions: string[] = [];

        // Add matching region names
        regions.forEach(region => {
          if (region.name.toLowerCase().includes(lowerSearchTerm)) {
            suggestions.push(region.name);
          }

          // Add matching city names
          region.cities.forEach(city => {
            if (city.name.toLowerCase().includes(lowerSearchTerm)) {
              suggestions.push(city.name);
            }
          });
        });

        // Remove duplicates and limit to 10 suggestions
        return [...new Set(suggestions)].slice(0, 10);
      })
    );
  }

  /**
   * Clear search term
   */
  clearSearch(): void {
    this.regionStateService.setSearchTerm('');
  }

  /**
   * Check if any results match the search term
   */
  hasSearchResults(): Observable<boolean> {
    return this.getFilteredRegions().pipe(
      map(regions => regions.length > 0)
    );
  }

  /**
   * Get search result count
   */
  getSearchResultCount(): Observable<{ regions: number; cities: number }> {
    return this.getFilteredRegions().pipe(
      map(regions => ({
        regions: regions.length,
        cities: regions.reduce((total, region) => total + region.cities.length, 0)
      }))
    );
  }
}