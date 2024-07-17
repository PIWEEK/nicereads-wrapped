import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WrappedComponent } from './pages/wrapped/wrapped.component';
import { HasDataGuard } from './guards/HasDataGuard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [HasDataGuard],
  },
  {
    path: 'wrapped',
    component: WrappedComponent,
  },
];
