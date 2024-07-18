import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeTags',
  standalone: true,
})
export class RemoveTagsPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value === 'string') {
      return value.replace(/<[^>]*>/g, '');
    }

    return null;
  }
}
