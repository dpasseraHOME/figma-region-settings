import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Region, City } from '../../models';
import { BadgeComponent } from '../badge/badge.component';
import { RegionItemComponent } from '../region-item/region-item.component';

@Component({
  selector: 'app-region-section',
  imports: [CommonModule, BadgeComponent, RegionItemComponent],
  templateUrl: './region-section.component.html',
  styleUrl: './region-section.component.scss'
})
export class RegionSectionComponent {
  @Input() region!: Region;
  @Input() isExpanded: boolean = false;
  
  @Output() toggleExpansion = new EventEmitter<string>();
  @Output() toggleSelection = new EventEmitter<string>();
  @Output() toggleCitySelection = new EventEmitter<{ regionId: string; cityId: string }>();
  @Output() toggleBaseRegion = new EventEmitter<{ regionId: string; cityId: string }>();

  trackByCityId(index: number, city: City): string {
    return city.id;
  }

  onToggleExpansion(): void {
    this.toggleExpansion.emit(this.region.id);
  }

  onToggleSelection(event: Event): void {
    event.stopPropagation();
    this.toggleSelection.emit(this.region.id);
  }

  onToggleCitySelection(event: { cityId: string }): void {
    this.toggleCitySelection.emit({ 
      regionId: this.region.id, 
      cityId: event.cityId 
    });
  }

  onToggleBaseRegion(event: { cityId: string }): void {
    this.toggleBaseRegion.emit({ 
      regionId: this.region.id, 
      cityId: event.cityId 
    });
  }

  getEnabledCount(): number {
    return this.region.cities.filter(city => city.isEnabled).length;
  }

  getBaseCount(): number {
    return this.region.cities.filter(city => city.isBaseRegion).length;
  }

  getFirstColumnCities(): City[] {
    const midpoint = Math.ceil(this.region.cities.length / 2);
    return this.region.cities.slice(0, midpoint);
  }

  getSecondColumnCities(): City[] {
    const midpoint = Math.ceil(this.region.cities.length / 2);
    return this.region.cities.slice(midpoint);
  }
}