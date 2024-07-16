import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WrappedComponent } from './pages/wrapped/wrapped.component';
import { LoggedInGuard } from './guard/HasDataGuard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'wrapped',
    component: WrappedComponent,
  },
];
