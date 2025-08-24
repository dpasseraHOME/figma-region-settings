import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegionsComponent } from './pages/regions/regions.component';
import { RegionsPrototypeBComponent } from './pages/regions-prototype-b/regions-prototype-b.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'regions', component: RegionsComponent },
  { path: 'regions-prototype-b', component: RegionsPrototypeBComponent },
  { path: '**', redirectTo: '' } // Wildcard route for 404s
];
