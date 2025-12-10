// A helper for generating a random integer between min
// and max, inclusive.
export function randInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}
