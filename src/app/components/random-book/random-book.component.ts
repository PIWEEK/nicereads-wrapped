import { Component, signal } from '@angular/core';
import { getRandomNumber, getRandomValueFromArray } from '../../utils';

@Component({
  selector: 'app-random-book',
  standalone: true,
  imports: [],
  template: `<div
    class="book"
    [style.width]="bookWidth()"
    [style.height]="bookHeight()"
  >
    <div [style.background-color]="coverColor()" class="cover left"></div>
    <div [style.background-color]="coverColor()" class="cover right"></div>
  </div>`,
  styleUrl: './random-book.component.css',
})
export class RandomBookComponent {
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
    return getRandomNumber(1, 40) + 40 + 'px';
  }

  public getHeight(): string {
    return getRandomNumber(1, 50) + 150 + 'px';
  }
}
