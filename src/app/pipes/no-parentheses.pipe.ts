import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noParentheses',
  standalone: true,
})
export class NoParenthesesPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value.replace(/ *\([^)]*\) */g, '').trim();
  }
}
