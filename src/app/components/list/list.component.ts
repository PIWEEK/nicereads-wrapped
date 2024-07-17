import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  public title = input.required<string>();
  public items = input.required<string[]>();
  public colors = signal<string[]>([
    'yellow',
    'green',
    'orange',
    'pink',
    'black',
    'yellow',
  ]);
}
