import { Component, input, signal } from '@angular/core';
import { Book } from '../../../../models';
import { BookComponent } from '../../../../components/book/book.component';
import { StarsComponent } from '../../../../components/stars/stars.component';
import { ListComponent } from '../../../../components/list/list.component';
import { DecimalPipe } from '@angular/common';

export interface Rating {
  value: number;
  items: string[];
  books: Book[];
}

@Component({
  selector: 'app-by-ratings',
  standalone: true,
  imports: [BookComponent, StarsComponent, ListComponent, DecimalPipe],
  templateUrl: './by-ratings.component.html',
  styleUrl: './by-ratings.component.css',
})
export class ByRatingsComponent {
  public readonly books = input.required<Book[], Book[]>({
    transform: (v: Book[]) => {
      this.getRatings(v);
      return v;
    },
  });

  public ratings = signal<Rating[]>([]);
  public averageRating = signal<number>(0);

  private getRatings(v: Book[]): void {
    const stars = [5, 4, 3, 2, 1, 0];
    const average =
      v
        .filter((v) => v.myRating)
        .reduce((acc, book) => acc + +(book?.myRating || 0), 0) / v.length;

    this.averageRating.set(average);

    const ratings = stars.map((star) => {
      if (star === 0) {
        const books = v.filter((book: Book) => !book.myRating);
        return {
          value: star,
          books: books,
          items: books?.map(
            (book: Book, index: number) =>
              `${index + 1}. ${book.title} <br/> <span class="author">${
                book.author
              }</span>`
          ),
        };
      } else {
        const books = v.filter(
          (book: Book) => book.myRating && +book.myRating === star
        );
        return {
          value: star,
          books: books,
          items: books?.map(
            (book: Book, index: number) =>
              `${index + 1}. ${book.title} <br/> <span class="author">${
                book.author
              }</span>`
          ),
        };
      }
    });

    this.ratings.set(ratings);
  }
}
