import { Component, input, signal } from '@angular/core';
import { Book } from '../../../../models';
import { BookComponent } from '../../../../components/book/book.component';

export interface BookShelf {
  name: string;
  books: Book[];
}

@Component({
  selector: 'app-by-bookshelves',
  standalone: true,
  imports: [BookComponent],
  templateUrl: './by-bookshelves.component.html',
  styleUrl: './by-bookshelves.component.css',
})
export class ByBookshelvesComponent {
  public readonly books = input.required<Book[], Book[]>({
    transform: (v: Book[]) => {
      // Do your thing
      this.getBookShelves(v);
      return v;
    },
  });

  public bookShelves = signal<BookShelf[]>([]);

  getBookShelves(v: Book[]) {
    const allBookShelves = [
      ...new Set(
        v.map((book: Book) => book.bookshelves || book.exclusiveShelf || '')
      ),
    ].filter((n) => n);

    const bookshelves: BookShelf[] = allBookShelves.map((bookShelf) => ({
      name: bookShelf,
      books: v.filter(
        (book: Book) =>
          book.bookshelves === bookShelf || book.exclusiveShelf === bookShelf
      ),
    }));

    this.bookShelves.set(bookshelves);
  }
}
