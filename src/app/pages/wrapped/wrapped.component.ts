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
import { ByBookshelvesComponent } from './components/by-bookshelves/by-bookshelves.component';
import { ByRatingsComponent } from './components/by-ratings/by-ratings.component';

@Component({
  selector: 'app-wrapped',
  standalone: true,
  imports: [
    SeeAllComponent,
    FilterComponent,
    ByPagesComponent,
    ByBookshelvesComponent,
    ByRatingsComponent,
  ],
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
        this.router.navigate(['/']);
      }
    } else {
      console.log('-- Books in $data --');

      this.books.set(books);
      this.filter();
    }
  }

  private filter(): void {
    if (this.view() === FilterBy.shelves) {
      if (this.year() === 'all') {
        this.filteredBooks.set(this.books());
      } else {
        this.filteredBooks.set(
          this.books().filter((book) => {
            if (book?.dateRead) {
              return new Date(book.dateRead).getFullYear() === this.year();
            }

            if (book?.dateAdded) {
              return new Date(book.dateAdded).getFullYear() === this.year();
            }

            return false;
          })
        );
      }
    } else {
      let books;

      if (this.year() === 'all') {
        books = this.books().filter((book) => book?.dateRead);
      } else {
        books = this.books().filter(
          (book) =>
            book?.dateRead &&
            new Date(book.dateRead).getFullYear() === this.year()
        );
      }

      const sortedBooks = books.sort((a, b) =>
        a.dateRead && b.dateRead
          ? new Date(b.dateRead).getTime() - new Date(a.dateRead).getTime()
          : 0
      );

      this.filteredBooks.set(sortedBooks);
    }
  }
}
