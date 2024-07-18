import { Component, input, signal } from '@angular/core';
import { BookComponent } from '../../../../components/book/book.component';
import { ListComponent } from '../../../../components/list/list.component';
import { Book } from '../../../../models';

export interface BasicBook {
  title: string;
  cover: string;
}

export interface List {
  title: string;
  items: string[];
}

@Component({
  selector: 'app-see-all',
  standalone: true,
  imports: [ListComponent, BookComponent],
  templateUrl: './see-all.component.html',
  styleUrls: ['./see-all.component.css', '../../wrapped.component.css'],
})
export class SeeAllComponent {
  public readonly books = input.required<Book[], Book[]>({
    transform: (v: Book[]) => {
      this.firstBook.set(this.getFirstBook(v));
      this.lastBook.set(this.getLastBook(v));
      this.booksByMonth.set(this.getBooksByMonth(v));
      return v;
    },
  });
  public readonly year = input.required<'all' | number>();
  public firstBook = signal<BasicBook>({ title: '', cover: '' });
  public lastBook = signal<BasicBook>({ title: '', cover: '' });
  public booksByMonth = signal<List[]>([]);

  private getFirstBook(v: Book[]): BasicBook {
    const book = v[0] as Book;
    return {
      title: book.title || '',
      cover: book.cover || '',
    };
  }

  private getLastBook(v: Book[]): BasicBook {
    const last = v.length - 1;
    const book = v[last] as Book;
    return {
      title: book.title || '',
      cover: book.cover || '',
    };
  }

  private getBooksByMonth(v: Book[]): List[] {
    const months: { [key: number]: string } = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    };
    return Object.keys(months).map((month) => {
      let monthBooks = v.filter(
        (book: Book) => new Date(book.dateRead!).getMonth() === +month
      );
      return {
        title: months[+month],
        items: monthBooks.map((book: Book) => `${book.title}. ${book.author}`),
      };
    });
  }
}
