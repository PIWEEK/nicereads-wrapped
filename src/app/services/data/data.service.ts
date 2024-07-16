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

    const books = await Promise.all(
      data.map(async (book) => {
        const opts: BooksOptions = {
          title: book?.title || '',
          author: book?.author || '',
          isbn: book?.isbn || book?.isbn13 || '',
        };
        const openLibraryBook: OpenLibraryBook | undefined =
          await this.openLibraryService.findBook(opts);
        return {
          ...book,
          genres: openLibraryBook?.subject || [],
          cover: openLibraryBook?.cover_i
            ? this.openLibraryService.getBookCoverById(openLibraryBook.cover_i)
            : undefined,
        } as Book;
      })
    );

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
