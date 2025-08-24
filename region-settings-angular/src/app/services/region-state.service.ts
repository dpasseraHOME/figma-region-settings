import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Region, City, RegionStats, RegionState } from '../models';
import { RegionDataService } from './region-data.service';

@Injectable({
  providedIn: 'root'
})
export class RegionStateService {
  private regionsSubject = new BehaviorSubject<Region[]>([]);
  private searchTermSubject = new BehaviorSubject<string>('');

  public regions$ = this.regionsSubject.asObservable();
  public searchTerm$ = this.searchTermSubject.asObservable();

  constructor(private regionDataService: RegionDataService) {
    // Initialize with data from RegionDataService
    this.initializeRegions();
  }

  /**
   * Initialize regions with default data
   */
  private initializeRegions(): void {
    const regions = this.regionDataService.getAllRegions();
    this.regionsSubject.next(regions);
  }

  /**
   * Get current regions value
   */
  getCurrentRegions(): Region[] {
    return this.regionsSubject.value;
  }

  /**
   * Get current search term
   */
  getCurrentSearchTerm(): string {
    return this.searchTermSubject.value;
  }

  /**
   * Update search term
   */
  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  /**
   * Toggle region expansion
   */
  toggleRegionExpansion(regionId: string): void {
    const regions = this.getCurrentRegions();
    const updatedRegions = regions.map(region => 
      region.id === regionId 
        ? { ...region, isExpanded: !region.isExpanded }
        : region
    );
    this.regionsSubject.next(updatedRegions);
  }

  /**
   * Toggle region selection (affects all cities in region)
   */
  toggleRegionSelection(regionId: string): void {
    const regions = this.getCurrentRegions();
    const updatedRegions = regions.map(region => {
      if (region.id === regionId) {
        const newSelectedState = !region.isSelected;
        return {
          ...region,
          isSelected: newSelectedState,
          cities: region.cities.map(city => ({
            ...city,
            isEnabled: newSelectedState
          }))
        };
      }
      return region;
    });
    this.regionsSubject.next(updatedRegions);
  }

  /**
   * Toggle individual city selection
   */
  toggleCitySelection(regionId: string, cityId: string): void {
    const regions = this.getCurrentRegions();
    const updatedRegions = regions.map(region => {
      if (region.id === regionId) {
        const updatedCities = region.cities.map(city =>
          city.id === cityId
            ? { ...city, isEnabled: !city.isEnabled }
            : city
        );
        
        // Update region selection based on city states
        const allEnabled = updatedCities.every(city => city.isEnabled);
        const noneEnabled = updatedCities.every(city => !city.isEnabled);
        
        return {
          ...region,
          cities: updatedCities,
          isSelected: allEnabled
        };
      }
      return region;
    });
    this.regionsSubject.next(updatedRegions);
  }

  /**
   * Toggle base region status (exclusive per region)
   */
  toggleBaseRegion(regionId: string, cityId: string): void {
    const regions = this.getCurrentRegions();
    const updatedRegions = regions.map(region => {
      if (region.id === regionId) {
        const updatedCities = region.cities.map(city => {
          if (city.id === cityId) {
            // Toggle this city's base status
            return { ...city, isBaseRegion: !city.isBaseRegion };
          } else if (city.isBaseRegion) {
            // Deactivate other base regions in this region (exclusive)
            return { ...city, isBaseRegion: false };
          }
          return city;
        });
        
        return { ...region, cities: updatedCities };
      }
      return region;
    });
    this.regionsSubject.next(updatedRegions);
  }

  /**
   * Enable all regions
   */
  enableAllRegions(): void {
    const regions = this.getCurrentRegions();
    const updatedRegions = regions.map(region => ({
      ...region,
      isSelected: true,
      cities: region.cities.map(city => ({ ...city, isEnabled: true }))
    }));
    this.regionsSubject.next(updatedRegions);
  }

  /**
   * Clear all regions
   */
  clearAllRegions(): void {
    const regions = this.getCurrentRegions();
    const updatedRegions = regions.map(region => ({
      ...region,
      isSelected: false,
      cities: region.cities.map(city => ({ ...city, isEnabled: false }))
    }));
    this.regionsSubject.next(updatedRegions);
  }

  /**
   * Enable all base regions (one per region)
   */
  enableAllBaseRegions(): void {
    const regions = this.getCurrentRegions();
    const updatedRegions = regions.map(region => ({
      ...region,
      cities: region.cities.map((city, index) => ({
        ...city,
        isBaseRegion: index === 0 // Make first city in each region the base
      }))
    }));
    this.regionsSubject.next(updatedRegions);
  }

  /**
   * Clear all base regions
   */
  clearAllBaseRegions(): void {
    const regions = this.getCurrentRegions();
    const updatedRegions = regions.map(region => ({
      ...region,
      cities: region.cities.map(city => ({ ...city, isBaseRegion: false }))
    }));
    this.regionsSubject.next(updatedRegions);
  }

  /**
   * Get global statistics
   */
  getGlobalStats(): Observable<{ enabled: RegionStats; base: RegionStats }> {
    return this.regions$.pipe(
      map(regions => {
        const allCities = regions.flatMap(region => region.cities);
        const enabledCities = allCities.filter(city => city.isEnabled);
        const baseCities = allCities.filter(city => city.isBaseRegion);

        return {
          enabled: {
            enabledCount: enabledCities.length,
            baseCount: 0, // Not used for enabled stats
            totalCount: allCities.length
          },
          base: {
            enabledCount: 0, // Not used for base stats
            baseCount: baseCities.length,
            totalCount: allCities.length
          }
        };
      })
    );
  }

  /**
   * Get statistics for a specific region
   */
  getRegionStats(regionId: string): Observable<{ enabled: RegionStats; base: RegionStats }> {
    return this.regions$.pipe(
      map(regions => {
        const region = regions.find(r => r.id === regionId);
        if (!region) {
          return {
            enabled: { enabledCount: 0, baseCount: 0, totalCount: 0 },
            base: { enabledCount: 0, baseCount: 0, totalCount: 0 }
          };
        }

        const enabledCities = region.cities.filter(city => city.isEnabled);
        const baseCities = region.cities.filter(city => city.isBaseRegion);

        return {
          enabled: {
            enabledCount: enabledCities.length,
            baseCount: 0,
            totalCount: region.cities.length
          },
          base: {
            enabledCount: 0,
            baseCount: baseCities.length,
            totalCount: region.cities.length
          }
        };
      })
    );
  }
}