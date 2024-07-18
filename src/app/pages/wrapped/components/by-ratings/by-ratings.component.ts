import { Component, input, signal } from '@angular/core';
import { Book } from '../../../../models';
import { BookComponent } from '../../../../components/book/book.component';

export interface Rating {
  value: number;
  books: Book[];
}

@Component({
  selector: 'app-by-ratings',
  standalone: true,
  imports: [BookComponent],
  templateUrl: './by-ratings.component.html',
  styleUrl: './by-ratings.component.css',
})
export class ByRatingsComponent {
  public readonly books = input.required<Book[], Book[]>({
    transform: (v: Book[]) => {
      // Do your thing
      this.getRatings(v);
      return v;
    },
  });

  public ratings = signal<Rating[]>([]);

  private getRatings(v: Book[]): void {
    const stars = [0, 1, 2, 3, 4, 5];

    const ratings = stars.map((star) => {
      if (star === 0) {
        return {
          value: star,
          books: v.filter((book: Book) => !book.myRating),
        };
      } else {
        return {
          value: star,
          books: v.filter(
            (book: Book) => book.myRating && +book.myRating === star
          ),
        };
      }
    });

    this.ratings.set(ratings);
  }
}
