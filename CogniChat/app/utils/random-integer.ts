/**
 * A helper function for generating a random integer between
 * a minimum and maximum integer, inclusive.
 * @param min The lowest integer, inclusive.
 * @param max The highest integer, inclusive.
 * @returns A random integer.
 */
export function randInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}
