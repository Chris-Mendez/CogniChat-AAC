// A lightweight wrapper that gives per-instance uniqueness to
// multiple items in a list. This is useful for allowing multiple
// duplicates to coexist in the same list and remain unique.
export interface Instanced<T> {
  instanceKey: string;
  value: T;
}
