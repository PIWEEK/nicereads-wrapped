import { Component, input, signal } from '@angular/core';
import { RandomBookComponent } from '../random-book/random-book.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-random-books-pile',
  standalone: true,
  imports: [RandomBookComponent, DecimalPipe],
  templateUrl: './random-books-pile.component.html',
  styleUrl: './random-books-pile.component.css',
})
export class RandomBooksPileComponent {
  public readonly numberOfBooks = input.required<number, number>({
    transform: (v: number) => {
      this.arrayBooks.set(Array.from({ length: v }, (_, i) => i));
      return v;
    },
  });

  public readonly pages = input.required<number>();

  public arrayBooks = signal<number[]>([]);

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
