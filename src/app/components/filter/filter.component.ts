import { Component, input, OnInit, output, signal } from '@angular/core';
import { Book } from '../../models';

export interface Filters {
  value: FilterBy;
  name: string;
}

export interface SelectedFilter {
  year: 'all' | number;
  by: FilterBy;
}

export enum FilterBy {
  all = 'all',
  genre = 'genre',
  shelves = 'shelves',
  pages = 'pages',
  ratings = 'ratings',
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
  public filters = signal<Filters[]>([
    { value: FilterBy.all, name: 'see all' },
    {
      value: FilterBy.genre,
      name: 'by genre',
    },
    {
      value: FilterBy.shelves,
      name: 'by bookshelves',
    },
    {
      value: FilterBy.pages,
      name: 'by pages',
    },
    {
      value: FilterBy.ratings,
      name: 'by ratings',
    },
  ]);
  public filterBy = output<SelectedFilter>();
  public filteredBooks = output<Book[]>();
  public selected = signal<SelectedFilter>({
    year: 'all',
    by: FilterBy.all,
  });

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
  }

  public filterByYear(year?: number): void {
    if (!year) {
      this.filteredBooks.emit(this.books().filter((book) => book.dateRead));
      this.selected.set({
        year: 'all',
        by: this.selected().by,
      });
      this.filterBy.emit(this.selected());

      return;
    }

    this.selected.set({
      year,
      by: this.selected().by,
    });
    this.filterBy.emit(this.selected());

    this.filteredBooks.emit(
      this.books().filter((book) => {
        return book?.dateRead && new Date(book.dateRead).getFullYear() === year;
      })
    );
  }

  public isSelected(
    filter: 'year' | 'by',
    value?: 'all' | number | FilterBy
  ): boolean {
    return this.selected()[filter] === value;
  }

  public filterByCategory(by: FilterBy): void {
    this.selected.set({
      year: this.selected().year,
      by,
    });
    this.filterBy.emit(this.selected());
  }
}
