/**
 * Helper function for iterating over the values of a TypeScript enum.
 * @param e The enum.
 * @returns An array of the keys of the enum.
 */
export function enumValuesOf<E extends Record<string, string | number>>(
  e: E
): E[keyof E][] {
  return Object.values(e).filter((v) => typeof v !== "string") as E[keyof E][];
}
