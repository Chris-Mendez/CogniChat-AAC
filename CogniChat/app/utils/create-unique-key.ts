import uuid from "react-native-uuid";

/**
 * Simple utility function for generating a random UUIDv4.
 * Useful for generating stable, reliable, unique keys.
 * @returns A random UUIDv4
 */
export default function createUniqueKey() {
  return uuid.v4();
}
