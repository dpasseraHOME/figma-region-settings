import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RegionStateService } from '../../services/region-state.service';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchTerm$: Observable<string>;

  constructor(private regionStateService: RegionStateService) {
    this.searchTerm$ = this.regionStateService.searchTerm$;
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.regionStateService.setSearchTerm(target.value);
  }
}