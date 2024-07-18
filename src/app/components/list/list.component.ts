import { Component, input } from '@angular/core';
import { NoParenthesesPipe } from '../../pipes/no-parentheses.pipe';
import { RemoveTagsPipe } from '../../pipes/remove-tags.pipe';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NoParenthesesPipe, RemoveTagsPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  public title = input.required<string>();
  public items = input.required<string[]>();
}
