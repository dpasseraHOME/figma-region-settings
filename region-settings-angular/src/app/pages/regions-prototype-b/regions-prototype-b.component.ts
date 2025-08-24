import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Region } from '../../models';
import { RegionStateService } from '../../services/region-state.service';
import { SearchService } from '../../services/search.service';
import { RegionHeaderComponent } from '../../components/region-header/region-header.component';
import { SearchComponent } from '../../components/search/search.component';
import { RegionSectionComponent } from '../../components/region-section/region-section.component';
import { BadgeComponent } from '../../components/badge/badge.component';

@Component({
  selector: 'app-regions-prototype-b',
  imports: [
    CommonModule,
    RegionHeaderComponent,
    SearchComponent,
    RegionSectionComponent,
    BadgeComponent
  ],
  templateUrl: './regions-prototype-b.component.html',
  styleUrl: './regions-prototype-b.component.scss'
})
export class RegionsPrototypeBComponent implements OnInit, OnDestroy {
  filteredRegions$: Observable<Region[]>;
  globalStats$: Observable<{ enabled: { enabledCount: number; baseCount: number; totalCount: number }; base: { enabledCount: number; baseCount: number; totalCount: number } }>;
  private destroy$ = new Subject<void>();

  constructor(
    private regionStateService: RegionStateService,
    private searchService: SearchService
  ) {
    this.filteredRegions$ = this.searchService.getFilteredRegions();
    this.globalStats$ = this.regionStateService.getGlobalStats();
  }

  ngOnInit(): void {
    // Component initialization logic can go here
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByRegionId(index: number, region: Region): string {
    return region.id;
  }

  onToggleRegionExpansion(regionId: string): void {
    this.regionStateService.toggleRegionExpansion(regionId);
  }

  onToggleRegionSelection(regionId: string): void {
    this.regionStateService.toggleRegionSelection(regionId);
  }

  onToggleCitySelection(event: { regionId: string; cityId: string }): void {
    this.regionStateService.toggleCitySelection(event.regionId, event.cityId);
  }

  onToggleBaseRegion(event: { regionId: string; cityId: string }): void {
    this.regionStateService.toggleBaseRegion(event.regionId, event.cityId);
  }

  getEnabledCount(region: Region): number {
    return region.cities.filter(city => city.isEnabled).length;
  }
}