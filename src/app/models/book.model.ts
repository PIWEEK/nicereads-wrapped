import { GoodreadsExport } from './goodreads-export.model';

export interface Book extends GoodreadsExport {
  cover?: string;
  genres: string[];
}
