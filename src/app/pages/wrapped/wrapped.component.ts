import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrapped',
  standalone: true,
  imports: [],
  templateUrl: './wrapped.component.html',
  styleUrl: './wrapped.component.css',
})
export class WrappedComponent {
  dataService = inject(DataService);
  router = inject(Router);

  constructor() {
    this.dataService.$data.subscribe((data) => {
      if (data.length === 0) {
        this.router.navigate(['/']);
      }
    });
  }

  clean() {
    this.dataService.cleanLocalStorage();
  }
}
