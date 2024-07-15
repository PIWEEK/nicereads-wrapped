export function validIsbn(isbn: string): boolean {
  if (!isbn) {
    return false;
  }

  const isbnRegex = /^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\d-]+$/;

  return isbnRegex.test(isbn);
}
