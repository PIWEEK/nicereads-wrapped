import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noParentheses',
  standalone: true,
})
export class NoParenthesesPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }
    return value.replace(/ *\([^)]*\) */g, '').trim();
  }
}
