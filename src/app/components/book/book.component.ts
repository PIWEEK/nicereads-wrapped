import { Component, input } from '@angular/core';
import { Book } from '../../models';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  public book = input.required<Book>();
}
