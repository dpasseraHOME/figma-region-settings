import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Region } from '../../models';
import { RegionStateService } from '../../services/region-state.service';
import { SearchService } from '../../services/search.service';
import { RegionHeaderComponent } from '../region-header/region-header.component';
import { SearchComponent } from '../search/search.component';
import { RegionSectionComponent } from '../region-section/region-section.component';

@Component({
  selector: 'app-region-settings',
  imports: [
    CommonModule,
    RegionHeaderComponent,
    SearchComponent,
    RegionSectionComponent
  ],
  templateUrl: './region-settings.component.html',
  styleUrl: './region-settings.component.scss'
})
export class RegionSettingsComponent implements OnInit, OnDestroy {
  filteredRegions$: Observable<Region[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private regionStateService: RegionStateService,
    private searchService: SearchService
  ) {
    this.filteredRegions$ = this.searchService.getFilteredRegions();
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
}