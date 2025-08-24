import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-base-tag',
  imports: [],
  templateUrl: './base-tag.component.html',
  styleUrl: './base-tag.component.scss'
})
export class BaseTagComponent {
  @Input() isActive: boolean = false;
  @Output() toggle = new EventEmitter<Event>();

  onToggle(event: Event): void {
    event.stopPropagation();
    this.toggle.emit(event);
  }
}