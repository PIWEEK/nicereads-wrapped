import { Component } from '@angular/core';

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
        console.log(
          'result array from objects  ----->',
          this.csvToArray(e?.target?.result as string)
        );
      };
    } else {
      console.log('failed reading the csv');
    }
  }

  csvToArray(csvContent: string) {
    console.log('raw csv ----->', csvContent);
    const csvSplitted: string[][] = csvContent
      ?.split(/\r?\n|\r|\n/g)
      .map((it) => it.trim())
      .filter((it) => it !== '')
      .map((it) => it.split(','));
    const headers = csvSplitted[0];
    console.log('headers ----->', headers);

    const result = [];
    for (let i = 1; i < csvSplitted.length; i++) {
      const row = csvSplitted[i];
      const obj: { [key: string]: string } = {};

      for (let j = 0; j < row.length; j++) {
        const headerKey = headers[j]?.toLowerCase().replace(/ /g, '_');
        obj[headerKey] = row[j];
      }

      // Agregar el objeto a la lista de objetos
      result.push(obj);
    }

    return result;
  }
}
