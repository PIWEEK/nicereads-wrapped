import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../services/data/data.service';

export const LoggedInGuard = () => {
  const dataService = inject(DataService);
  const router = inject(Router);

  const books = dataService.getFromLocalstorage();
  if (books.length > 0) {
    dataService.$data.next(books);
    return router.navigate(['/wrapped']);
  }
  return true;
};
