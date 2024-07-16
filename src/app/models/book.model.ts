import { GoodreadsExport } from './goodreads-export.model';

export interface Book extends GoodreadsExport {
  coverId?: string;
  genres: string[];
}
