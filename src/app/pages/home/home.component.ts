import { Component } from '@angular/core';
import { toCamelCase } from '../../utils/strings.util';
import { GoodreadsExport } from '../../models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  onSelectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (
      target.files &&
      target.files[0] &&
      target.files[0].type === 'text/csv'
    ) {
      var reader = new FileReader();
      reader.readAsText(target.files[0]);
      reader.onload = (e) => {
        // save this in localstorage
        console.log(
          'result  ----->',
          this.csvToArray(e?.target?.result as string)
        );
      };
    } else {
      console.log('failed reading the csv');
    }
  }

  csvToArray(csvContent: string): GoodreadsExport[] {
    const csvSplitted: string[][] = this.csvToArrayOfArrays(csvContent);
    const headers = csvSplitted[0];

    const result: GoodreadsExport[] = [];
    for (let i = 1; i < csvSplitted.length; i++) {
      const row = csvSplitted[i];
      const obj: GoodreadsExport = {};

      for (let j = 0; j < row.length; j++) {
        const headerKey = toCamelCase(headers[j]) as keyof GoodreadsExport;
        if (headerKey === 'isbn' || headerKey === 'isbn13') {
          const regex = /(\d+)/;
          const match = row[j].match(regex);
          obj[headerKey] = (match && match[1]) || '';
        } else {
          obj[headerKey] = row[j];
        }
      }

      result.push(obj);
    }

    return result;
  }

  csvToArrayOfArrays(csv: string) {
    const lines = csv.trim().split('\n');
    const arrayOfArrays = lines.map((line) => {
      return line
        .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        .map((value) => value.trim().replace(/^"|"$/g, ''));
    });
    return arrayOfArrays;
  }
}
