import { Component, input, signal } from '@angular/core';
import { Book } from '../../../../models';
import { ListComponent } from '../../../../components/list/list.component';
import { DecimalPipe } from '@angular/common';

export interface List {
  title: string;
  items: string[];
}

@Component({
  selector: 'app-by-pages',
  standalone: true,
  imports: [ListComponent, DecimalPipe],
  templateUrl: './by-pages.component.html',
  styleUrl: './by-pages.component.css',
})
export class ByPagesComponent {
  public readonly books = input.required<Book[], Book[]>({
    transform: (v: Book[]) => {
      this.lists.set(this.prepareList(v));
      this.pages.set(this.getAllPages(v));
      return v;
    },
  });
  public readonly year = input.required<'all' | number>();

  public lists = signal<List[]>([]);
  public pages = signal<number>(0, {});

  private getAllPages(v: Book[]): number {
    return v.reduce((a, b) => {
      return b.numberOfPages ? a + +b.numberOfPages : a;
    }, 0);
  }

  private prepareList(v: Book[]): List[] {
    const pagesRange = [
      {
        min: 1,
        max: 100,
        label: '0-100 pages',
      },
      {
        min: 101,
        max: 200,
        label: '100-200 pages',
      },
      {
        min: 201,
        max: 300,
        label: '200-300 pages',
      },
      {
        min: 301,
        max: undefined,
        label: '300 pages or more',
      },
    ];

    return pagesRange.map((range) => {
      let books = v.filter(
        (book: Book) => book?.numberOfPages && +book.numberOfPages >= range.min
      );

      if (range.max) {
        books = books.filter(
          (book: Book) =>
            book?.numberOfPages && +book.numberOfPages <= range.max
        );
      }

      return {
        title: range.label,
        items: books.map(
          (book: Book, index: number) =>
            `${index + 1}. ${book.title} <br/> <span class="author">${
              book.author
            }</span>`
        ),
      };
    });
  }
}
