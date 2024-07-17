import { Component, input } from '@angular/core';
import { Book } from '../../models';
import { BookComponent } from '../book/book.component';

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
