import { TestBed } from '@angular/core/testing';

import { describe, beforeEach, it, expect } from 'vitest';

import { OpenLibraryService } from './open-library.service';

describe('OpenLibraryService', () => {
  let service: OpenLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('findBookByTitleAndAuthor should return a valid book', async () => {
    const book = await service.findBookByTitleAndAuthor(
      'The Hobbit',
      'J.R.R. Tolkien'
    );
    expect(book).toBeDefined();
  });

  it('findBookByTitleAndAuthor should return undefined is no book is found', async () => {
    const book = await service.findBookByTitleAndAuthor('-', '-');
    expect(book).toBeUndefined();
  });

  it('findBookByIsbn should return a valid book', async () => {
    const book = await service.findBookByIsbn('9780261102217');
    expect(book).toBeDefined();
  });

  it('findBookByIsbn should return undefined is no book is found', async () => {
    const book = await service.findBookByIsbn('-');
    expect(book).toBeUndefined();
  });

  it('getBookCoverById should return a valid cover url', () => {
    const cover = service.getBookCoverById('14627509');
    expect(cover).toBeDefined();
  });

  it('getBookCoverById should return undefined if no cover id is provided', () => {
    const cover = service.getBookCoverById('');
    expect(cover).toBeUndefined();
  });

  it('findBook should return a valid book', async () => {
    const book = await service.findBook({
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      isbn: '9780261102217',
    });
    expect(book).toBeDefined();
  });

  it('findBook should return undefined if no book is found', async () => {
    const book = await service.findBook({
      title: '-',
      author: '-',
      isbn: '-',
    });
    expect(book).toBeUndefined();
  });

  it('getBookCover should return a valid cover url', async () => {
    const cover = await service.getBookCover({
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      isbn: '9780261102217',
    });
    expect(cover).toBeDefined();
  });

  it('getBookCover should return undefined if no book is found', async () => {
    const cover = await service.getBookCover({
      title: '-',
      author: '-',
      isbn: '-',
    });
    expect(cover).toBeUndefined();
  });
});
