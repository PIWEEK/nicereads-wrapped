import { Injectable } from '@angular/core';
import { BooksOptions, CoverSize, OpenLibraryBook } from '../../models';
import { validIsbn } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class OpenLibraryService {
  private apiUrl = 'https://openlibrary.org/search.json?';

  public async findBookByTitleAndAuthor(
    title: string,
    author: string
  ): Promise<OpenLibraryBook | undefined> {
    const trimmedTitle = title
      .replace(/ *\([^)]*\) */g, '')
      .trim()
      .split(':')[0];
    const response = await fetch(
      `${this.apiUrl}title=${encodeURIComponent(
        trimmedTitle
      )}&author=${encodeURIComponent(author)}`
    );
    const data = await response.json();
    const book = data.docs?.find((book: OpenLibraryBook) =>
      book.title.includes(trimmedTitle)
    );
    return book;
  }
  public async findBookByIsbn(
    isbn: string
  ): Promise<OpenLibraryBook | undefined> {
    if (!isbn || !validIsbn(isbn)) {
      return undefined;
    }
    const response = await fetch(
      `${this.apiUrl}isbn=${encodeURIComponent(isbn)}`
    );
    const data = await response.json();
    const book = data.docs?.[0];
    return book;
  }

  public getBookCoverById(
    coverId: string,
    size: CoverSize = CoverSize.LARGE
  ): string | undefined {
    if (!coverId) {
      return undefined;
    }
    return `https://covers.openlibrary.org/b/id/${encodeURIComponent(
      coverId
    )}-${size}.jpg`;
  }

  public async findBook(
    opts: BooksOptions
  ): Promise<OpenLibraryBook | undefined> {
    const { title, author, isbn } = opts;
    return (
      (await this.findBookByIsbn(isbn)) ||
      (await this.findBookByTitleAndAuthor(title, author))
    );
  }

  public async getBookCover(
    opts: BooksOptions,
    size: CoverSize = CoverSize.LARGE
  ): Promise<string | undefined> {
    const book = await this.findBook(opts);

    if (!book || !book.cover_i) {
      return undefined;
    }

    return this.getBookCoverById(book.cover_i, size);
  }
}
