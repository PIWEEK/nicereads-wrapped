import { Component, inject, signal } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Router } from '@angular/router';
import { Book } from '../../models';
import {
  FilterBy,
  FilterComponent,
  SelectedFilter,
} from '../../components/filter/filter.component';
import { SeeAllComponent } from './components/see-all/see-all.component';
import { ByPagesComponent } from './components/by-pages/by-pages.component';

@Component({
  selector: 'app-wrapped',
  standalone: true,
  imports: [SeeAllComponent, FilterComponent, ByPagesComponent],
  templateUrl: './wrapped.component.html',
  styleUrl: './wrapped.component.css',
})
export class WrappedComponent {
  dataService = inject(DataService);
  router = inject(Router);

  books = signal<Book[]>([]);
  filteredBooks = signal<Book[]>([]);
  view = signal<FilterBy>(FilterBy.all);
  year = signal<'all' | number>('all');

  constructor() {
    this.getBooks();
  }

  public clean(): void {
    this.dataService.cleanLocalStorage();
    this.router.navigate(['/']);
  }

  public onFilterBy(filter: SelectedFilter): void {
    this.view.set(filter.by);
    this.year.set(filter.year);
    this.filter();
  }

  private getBooks(): void {
    const localBooks = this.dataService.getFromLocalstorage();
    const books = this.dataService.$data.getValue();

    if (!books || books.length === 0) {
      console.log('-- No books in $data --');

      if (localBooks && localBooks.length > 0) {
        console.log('-- Books in localstorage --');

        this.dataService.$data.next(localBooks);
        this.books.set(this.dataService.$data.getValue());
        this.filter();
      } else {
        console.log('-- No books in localstorage --');
      }
    } else {
      console.log('-- Books in $data --');

      this.books.set(books);
      this.filter();
    }
  }

  private filter(): void {
    if (this.year() === 'all') {
      if (this.view() === FilterBy.shelves) {
        this.filteredBooks.set(this.books());
      } else {
        this.filteredBooks.set(this.books().filter((book) => book?.dateRead));
      }
    } else {
      this.filteredBooks.set(
        this.books().filter(
          (book) =>
            book?.dateRead &&
            new Date(book.dateRead).getFullYear() === this.year()
        )
      );
    }
  }
}
