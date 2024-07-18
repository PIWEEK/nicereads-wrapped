import { Component, input, signal } from '@angular/core';
import { Book } from '../../../../models';
import { ListComponent } from '../../../../components/list/list.component';

export interface Genre {
  name: string;
  books: Book[];
  list: string[];
  qt: number;
}

@Component({
  selector: 'app-by-genre',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './by-genre.component.html',
  styleUrl: './by-genre.component.css',
})
export class ByGenreComponent {
  public readonly books = input.required<Book[], Book[]>({
    transform: (v: Book[]) => {
      this.getGenres(v);
      return v;
    },
  });

  public uniqueGenres = signal<string[]>([]);
  public genres = signal<Genre[]>([]);
  public limitedGenres = signal<Genre[]>([]);

  private getGenres(v: Book[]): void {
    const genres = v
      .map((book) => book.genres)
      .filter((g) => g.length > 0)
      .map((g) =>
        g.map((genre) => genre.split(',').map((g) => g.toLowerCase().trim()))
      )
      .flat(2);

    const uniqueGenres = [...new Set(genres)];

    const genresWithBooks: Genre[] = uniqueGenres.map((genre) => {
      const books = v.filter((book) =>
        book.genres.some((g) => g.toLocaleLowerCase().includes(genre))
      );
      return {
        name: genre,
        books,
        qt: books.length,
        list: books.map((b) => `${b.title}. ${b.author}`),
      };
    });

    genresWithBooks.sort((a, b) => b.qt - a.qt);

    this.genres.set(genresWithBooks);
    this.limitedGenres.set(genresWithBooks.slice(0, 5));
  }
}
