import { Component, input, signal } from '@angular/core';
import { RandomBookComponent } from '../random-book/random-book.component';
import { DecimalPipe } from '@angular/common';
import { Book } from '../../models';
import { NoParenthesesPipe } from '../../pipes/no-parentheses.pipe';

@Component({
  selector: 'app-random-books-pile',
  standalone: true,
  imports: [RandomBookComponent, DecimalPipe, NoParenthesesPipe],
  templateUrl: './random-books-pile.component.html',
  styleUrl: './random-books-pile.component.css',
})
export class RandomBooksPileComponent {
  public books = input.required<Book[], Book[]>({
    transform: (v: Book[]) => {
      const pages = v.reduce((a, b) => {
        return b.numberOfPages ? a + +(b.numberOfPages || 0) : a;
      }, 0);
      this.size.set(this.getSize(pages));
      return v;
    },
  });

  public size = signal<string>('');

  public getSize(pages: number) {
    const milimiters = pages * 0.21;

    if (milimiters < 100) {
      return `${Math.floor(milimiters)} milimiters`;
    }

    if (milimiters < 1000) {
      return `${Math.floor(milimiters / 100)} centimeters`;
    }

    return `${Math.floor(milimiters / 1000)} meters`;
  }
}
