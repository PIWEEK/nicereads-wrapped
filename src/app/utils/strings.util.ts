export function toCamelCase(str: string): string {
  // Clean string from leading underscores, hyphens or spaces
  const clean = str.toLocaleLowerCase().replace(/^(_|-| )_?/, '');

  // Replace all underscores and hyphens followed by a character
  // with that character in uppercase
  return clean.replace(/(_|-| )./g, (x) => x[1].toUpperCase());
}
