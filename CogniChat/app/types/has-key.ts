/**
 * A lightweight interface for list stability. The "key" property
 * is somewhat special in React Native, but generally this is useful
 * for keeping items unique within an array. Never use an array's
 * index to do the job of a key, as indexes are considered unstable.
 */
export interface HasKey {
  key: string;
}
