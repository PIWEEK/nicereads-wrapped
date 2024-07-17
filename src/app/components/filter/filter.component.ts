import { Component, input, OnInit, output, signal } from '@angular/core';
import { Book } from '../../models';

export interface Filters {
  years: number[];
  shelves: string[];
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  public readonly books = input.required<Book[]>();
  public fYears = signal<number[]>([]);
  public fShelves = signal<string[]>([]);
  public filteredBooks = output<Book[]>();
  public selected = signal<string>('all-shelves');

  public ngOnInit(): void {
    this.getFilters();
  }

  public getFilters(): void {
    let dates: number[] = [];
    let shelves: string[] = [];

    this.books().forEach((book) => {
      if (book.dateRead) {
        dates.push(new Date(book.dateRead).getFullYear());
      }

      if (book.bookshelves || book.exclusiveShelf) {
        shelves.push(book.bookshelves || book.exclusiveShelf || '');
      }
    });

    this.fYears.set([...new Set(dates)].sort());
    this.fShelves.set([...new Set(shelves)]);
  }

  public filterByYear(year?: number): void {
    if (!year) {
      this.filteredBooks.emit(this.books().filter((book) => book.dateRead));
      this.selected.set('all-years');
      return;
    }

    this.selected.set(`year-${year}`);

    this.filteredBooks.emit(
      this.books().filter((book) => {
        return book?.dateRead && new Date(book.dateRead).getFullYear() === year;
      })
    );
  }

  public isSelected(
    filter: 'year' | 'shelf',
    value?: string | number
  ): boolean {
    return this.selected() === `${filter}-${value}`;
  }

  public filterByShelf(shelf?: string): void {
    if (!shelf) {
      this.filteredBooks.emit(this.books());
      this.selected.set('all-shelves');
      return;
    }

    this.selected.set(`shelf-${shelf}`);

    this.filteredBooks.emit(
      this.books().filter((book) => {
        return book?.bookshelves === shelf || book?.exclusiveShelf === shelf;
      })
    );
  }
}
