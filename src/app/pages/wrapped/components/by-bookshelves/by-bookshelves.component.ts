import { Component, input, signal } from '@angular/core';
import { Book } from '../../../../models';
import { ListComponent } from '../../../../components/list/list.component';

export interface List {
  title: string;
  items: string[];
}

@Component({
  selector: 'app-by-bookshelves',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './by-bookshelves.component.html',
  styleUrl: './by-bookshelves.component.css',
})
export class ByBookshelvesComponent {
  public readonly books = input.required<Book[], Book[]>({
    transform: (v: Book[]) => {
      this.bookShelves.set(this.getBookShelves(v));
      return v;
    },
  });

  public bookShelves = signal<List[]>([]);

  private getBookShelves(v: Book[]): List[] {
    const allBookShelves = [
      ...new Set(
        v.map((book: Book) => book.exclusiveShelf || book.bookshelves || '')
      ),
    ].filter((n) => n === 'read' || n === 'to-read');

    const bookshelves: List[] = allBookShelves.map((bookShelf) => {
      const bookshelveBooks = v.filter(
        (book: Book) =>
          book.exclusiveShelf === bookShelf || book.bookshelves === bookShelf
      );
      return {
        title: this.getBookShelfName(bookShelf),
        items: bookshelveBooks.map(
          (book: Book, index: number) =>
            `${index + 1}. ${book.title} <br />  <span class="author">${
              book.author
            }</span>`
        ),
      };
    });
    return bookshelves;
  }

  private getBookShelfName(bookshelf: string) {
    if (bookshelf === 'to-read') {
      return 'want to read';
    } else {
      return 'read';
    }
  }
}
