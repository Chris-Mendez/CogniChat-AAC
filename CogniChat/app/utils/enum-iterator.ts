// A helper function for iterating over the values of a
// TypeScript enum. Compatible with both ExampleEnum1 { a, b, c }
// and ExampleEnum2 { a="a", b="b", c="c" }
export function enumValuesOf<E extends Record<string, string | number>>(
  e: E
): E[keyof E][] {
  return Object.values(e).filter((v) => typeof v !== "string") as E[keyof E][];
}
