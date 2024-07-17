import { Component, inject } from '@angular/core';
import { toCamelCase } from '../../utils/strings.util';
import { GoodreadsExport } from '../../models';
import { DataService } from '../../services/data/data.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public rawCsv: string = '';
  public goBtn = true;

  dataService = inject(DataService);
  router = inject(Router);

  constructor() {
    this.dataService.$data.pipe(takeUntilDestroyed()).subscribe((data) => {
      if (data.length > 0) {
        this.router.navigate(['/wrapped']);
      }
    });
  }

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
        this.rawCsv = e?.target?.result as string;
        this.goBtn = false;
      };
    } else {
      console.log('failed reading the csv');
      this.goBtn = true;
    }
  }

  generateData() {
    this.dataService.processData(this.csvToArray(this.rawCsv));
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
