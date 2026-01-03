/**
 * A helper function for shuffling the elements of an
 * array randomly.
 * @param arr The array.
 * @returns A copy of the array but shuffled.
 */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
