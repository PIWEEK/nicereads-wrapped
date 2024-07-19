import { Component, input, signal } from '@angular/core';
import { Book } from '../../../../models';
import { ListComponent } from '../../../../components/list/list.component';

export interface List {
  title: string;
  items: string[];
}

@Component({
  selector: 'app-by-author',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './by-author.component.html',
  styleUrls: ['./by-author.component.css', '../../wrapped.component.css'],
})
export class ByAuthorComponent {
  public readonly books = input.required<Book[], Book[]>({
    transform: (v: Book[]) => {
      this.authors.set(this.getAuthors(v));
      return v;
    },
  });

  public authors = signal<List[]>([]);

  private getAuthors(v: Book[]): List[] {
    const allAuthors = [
      ...new Set(v.map((book: Book) => book.author || book.authorLF || '')),
    ].filter((n) => n);

    const authors: List[] = allAuthors.map((author) => {
      const authorBooks = v.filter(
        (book: Book) => book.author === author || book.authorLF === author
      );
      return {
        title: author,
        items: authorBooks.map(
          (book: Book, index: number) => `${index + 1}. ${book.title}`
        ),
      };
    });

    const sortedAuthors = authors.sort(
      (a, b) => b.items.length - a.items.length
    );

    return sortedAuthors.slice(0, 3);
  }
}
