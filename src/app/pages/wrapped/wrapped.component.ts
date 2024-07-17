import { Component, inject, signal } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Router } from '@angular/router';
import { BookComponent } from '../../components/book/book.component';
import { Book } from '../../models';
import {
  FilterBy,
  FilterComponent,
  SelectedFilter,
} from '../../components/filter/filter.component';
import { SeeAllComponent } from './components/see-all/see-all.component';

@Component({
  selector: 'app-wrapped',
  standalone: true,
  imports: [SeeAllComponent, FilterComponent],
  templateUrl: './wrapped.component.html',
  styleUrl: './wrapped.component.css',
})
export class WrappedComponent {
  dataService = inject(DataService);
  router = inject(Router);

  books = signal<Book[]>([]);
  filteredBooks = signal<Book[]>([]);
  view = signal<FilterBy>(FilterBy.all);

  constructor() {
    this.getBooks();
  }

  public clean(): void {
    this.dataService.cleanLocalStorage();
    this.router.navigate(['/']);
  }

  public onFilterBy(filter: SelectedFilter): void {
    // Filter books by selected year (using read date)
    this.filterBooksByYear(filter.year);

    // Change view based on selected filter
    this.view.set(filter.by);
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
        this.filteredBooks.set(this.books());
      } else {
        console.log('-- No books in localstorage --');
      }
    } else {
      console.log('-- Books in $data --');

      this.books.set(books);
      this.filteredBooks.set(this.books());
    }
  }

  private filterBooksByYear(year: 'all' | number) {
    if (year === 'all') {
      this.filteredBooks.set(this.books());
      return;
    }

    this.filteredBooks.set(
      this.books().filter(
        (book) =>
          book?.dateRead && new Date(book.dateRead).getFullYear() === year
      )
    );
  }
}
