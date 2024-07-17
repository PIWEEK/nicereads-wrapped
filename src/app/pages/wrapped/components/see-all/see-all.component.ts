import { Component, input } from '@angular/core';
import { BookComponent } from '../../../../components/book/book.component';
import { Book } from '../../../../models';

@Component({
  selector: 'app-see-all',
  standalone: true,
  imports: [BookComponent],
  templateUrl: './see-all.component.html',
  styleUrl: './see-all.component.css',
})
export class SeeAllComponent {
  public readonly books = input.required<Book[]>();
}
