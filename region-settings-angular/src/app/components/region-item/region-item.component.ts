import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { City } from '../../models';
import { BaseTagComponent } from '../base-tag/base-tag.component';

@Component({
  selector: 'app-region-item',
  imports: [CommonModule, BaseTagComponent],
  templateUrl: './region-item.component.html',
  styleUrl: './region-item.component.scss'
})
export class RegionItemComponent {
  @Input() city!: City;
  @Input() regionId!: string;
  @Input() isSelected: boolean = false;
  
  @Output() toggleSelection = new EventEmitter<{ cityId: string }>();
  @Output() toggleBase = new EventEmitter<{ cityId: string }>();

  onItemClick(): void {
    // Could emit item selection event here for UI feedback
    // For now, we'll just handle the checkbox toggle
  }

  onToggleSelection(event: Event): void {
    event.stopPropagation();
    this.toggleSelection.emit({ cityId: this.city.id });
  }

  onToggleBase(event: Event): void {
    event.stopPropagation();
    this.toggleBase.emit({ cityId: this.city.id });
  }
}