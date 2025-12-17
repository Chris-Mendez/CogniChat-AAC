import uuid from "react-native-uuid";

// Simple utility function for generating a unique key.
export default function createUniqueKey() {
  return uuid.v4();
}
