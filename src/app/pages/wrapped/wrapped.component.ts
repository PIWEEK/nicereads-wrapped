import { Component, inject, signal } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Router } from '@angular/router';
import { BookComponent } from '../../components/book/book.component';
import { Book } from '../../models';
import { FilterComponent } from '../../components/filter/filter.component';

@Component({
  selector: 'app-wrapped',
  standalone: true,
  imports: [BookComponent, FilterComponent],
  templateUrl: './wrapped.component.html',
  styleUrl: './wrapped.component.css',
})
export class WrappedComponent {
  dataService = inject(DataService);
  router = inject(Router);

  books = signal<Book[]>([]);
  filteredBooks = signal<Book[]>([]);

  constructor() {
    this.getBooks();
  }

  public clean(): void {
    this.dataService.cleanLocalStorage();
    this.router.navigate(['/']);
  }

  public onFilteredBooks(books: Book[]): void {
    this.filteredBooks.set(books);
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
}
