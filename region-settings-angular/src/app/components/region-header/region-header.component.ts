import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RegionStateService } from '../../services/region-state.service';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'app-region-header',
  imports: [CommonModule, BadgeComponent],
  templateUrl: './region-header.component.html',
  styleUrl: './region-header.component.scss'
})
export class RegionHeaderComponent {
  globalStats$: Observable<{ enabled: { enabledCount: number; baseCount: number; totalCount: number }; base: { enabledCount: number; baseCount: number; totalCount: number } }>;

  constructor(private regionStateService: RegionStateService) {
    this.globalStats$ = this.regionStateService.getGlobalStats();
  }

  onEnableAllRegions(): void {
    this.regionStateService.enableAllRegions();
  }

  onClearAllRegions(): void {
    this.regionStateService.clearAllRegions();
  }

  onEnableAllBaseRegions(): void {
    this.regionStateService.enableAllBaseRegions();
  }

  onClearAllBaseRegions(): void {
    this.regionStateService.clearAllBaseRegions();
  }
}