import { Component, input, signal } from '@angular/core';
import { getRandomNumber, getRandomValueFromArray } from '../../utils';
import { Book } from '../../models';
import { NoParenthesesPipe } from '../../pipes/no-parentheses.pipe';

@Component({
  selector: 'app-random-book',
  standalone: true,
  imports: [NoParenthesesPipe],
  template: `<div
    class="book"
    [style.width]="bookWidth()"
    [style.height]="bookHeight()"
  >
    <div class="spine" [style.background-color]="coverColor()">
      <div class="book-title">
        {{ book()?.title || '' | noParentheses }}
      </div>
      <div class="book-writer">
        {{ book()?.author }}
      </div>
    </div>
    <div [style.background-color]="coverColor()" class="cover left"></div>
    <div [style.background-color]="coverColor()" class="cover right"></div>
  </div>`,
  styleUrl: './random-book.component.css',
})
export class RandomBookComponent {
  public book = input<Book | undefined>(undefined);

  public colors = [
    // Neon Yellow
    '#FFFF00',
    '#FFFF33',
    '#F2EA02',
    '#E6FB04',

    // Neon Red
    '#FF0000',
    '#FD1C03',
    '#FF3300',
    '#FF6600',

    // Neon Green
    '#00FF00',
    '#00FF33',
    '#00FF66',
    '#33FF00',

    // Neon Blue
    '#00FFFF',
    '#099FFF',
    '#0062FF',
    '#0033FF',

    // Neon Pink
    '#FF00FF',
    '#FF00CC',
    '#FF0099',
    '#CC00FF',

    // Neon Purple
    '#9D00FF',
    '#CC00FF',
    '#6E0DD0',
    '#9900FF',
  ];
  public coverColor = signal<string>(this.getColor());
  public bookWidth = signal<string>(this.getWidth());
  public bookHeight = signal<string>(this.getHeight());

  public getColor(): string {
    return getRandomValueFromArray(this.colors);
  }

  public getWidth(): string {
    const pages = this.book()?.numberOfPages
      ? +(this.book()?.numberOfPages || 0)
      : 0;

    return pages > 0
      ? `${Math.floor(pages / 2)}px`
      : `${getRandomNumber(1, 40) + 40}px`;
  }

  public getHeight(): string {
    return `${getRandomNumber(1, 80) + 180}px`;
  }
}
