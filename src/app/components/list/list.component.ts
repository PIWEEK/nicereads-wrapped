import { Component, input } from '@angular/core';
import { NoParenthesesPipe } from '../../pipes/no-parentheses.pipe';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NoParenthesesPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  public title = input.required<string>();
  public items = input.required<string[]>();
}
