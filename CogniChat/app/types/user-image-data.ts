/**
 * This interface defines the important properties of a
 * user-provided image file.
 */
export interface UserImageData {
  /**
   * The SHA256 of the contents of the image file, used
   * for unique identification and avoiding duplicates.
   */
  hash: string;

  /**
   * The path to the image, which is stored locally.
   */
  localUri: string;

  /**
   * The number of tiles that are using this image.
   * Incremented when a new tile uses this image, and
   * decremented when a tile is permanently deleted
   * or stops using this image.
   * This is a local reference count. NOT a
   * global reference count.
   */
  refCount: number;
}
