import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { OpenLibraryService } from '../open-library/open-library.service';
import {
  Book,
  BooksOptions,
  GoodreadsExport,
  OpenLibraryBook,
} from '../../models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly openLibraryService = inject(OpenLibraryService);

  public readonly $isLoading = new Subject<boolean>();
  public readonly $data = new BehaviorSubject<Book[]>([]);

  public async processData(data: GoodreadsExport[]): Promise<void> {
    this.$isLoading.next(true);

    const books = [];
    for (const book of data) {
      const opts: BooksOptions = {
        title: book?.title || '',
        author: book?.author || '',
        isbn: book?.isbn || book?.isbn13 || '',
      };
      const openLibraryBook: OpenLibraryBook | undefined =
        await this.openLibraryService.findBook(opts);
      books.push({
        ...book,
        genres: openLibraryBook?.subject || [],
        numberOfPages:
          book.numberOfPages || openLibraryBook?.number_of_pages_median || 0,
        cover: openLibraryBook?.cover_i
          ? this.openLibraryService.getBookCoverById(openLibraryBook.cover_i)
          : undefined,

        /** Consider read books without dateRead */
        dateRead:
          book?.dateRead ||
          (book.exclusiveShelf === 'read' && book.dateAdded
            ? book.dateAdded
            : ''),
      } as Book);
    }

    if (books.length > 0) {
      this.saveLocalStorage(books);
      console.log('-- Books saved in localstorage --');
    }

    this.$data.next(books || []);
    this.$isLoading.next(false);
  }

  public getFromLocalstorage(): Book[] {
    const data = localStorage.getItem('books');
    return data ? JSON.parse(data) : [];
  }

  public cleanLocalStorage(): void {
    localStorage.removeItem('books');
    this.$data.next([]);
    console.log('-- Books removed from localstorage --');
  }

  private saveLocalStorage(data: Book[]): void {
    localStorage.setItem('books', JSON.stringify(data));
  }
}
