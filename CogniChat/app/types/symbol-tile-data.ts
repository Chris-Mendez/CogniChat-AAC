import { HasKey } from "@/app/types/has-key";
import { SymbolTileCategoryKey } from "@/app/types/symbol-tile-categories";
import { ImageSource, ImageSourcePropType } from "react-native";

/**
 * This interface defines the important properties of a
 * symbol tile. A symbol tile can be thought of as a button
 * with an image and/or text label.
 */
export interface SymbolTileData extends HasKey {
  /**
   * The text label of this symbol tile, which can
   * be undefined in the case that this symbol tile
   * uses an image label.
   * @example "Hello"
   */
  textLabel?: string;

  /**
   * The image label of this symbol tile, which can
   * be undefined in the case that this symbol tile
   * uses a text label.
   *
   * If kind is "bundled" then the image is bundled
   * internally with the app. Use the "source" property
   * to access the image.
   *
   * If kind is "stored" then the image is provided by
   * the user and stored in the AAC user image context.
   * Use the "hash" property and the AAC user image
   * context to access the image.
   */
  imageLabel?: ImageRef;

  /**
   * The actual text used for the text-to-speech feature.
   * Must be defined.
   * @example "Hello"
   */
  vocalization: string;

  /**
   * The category in which this symbol tile belongs to.
   * Must be defined.
   */
  category: SymbolTileCategoryKey;
}

type BundledImageRef = {
  kind: "bundled";
  source: ImageSourcePropType;
};

type StoredImageRef = {
  kind: "stored";
  hash: string;
};

export type ImageRef = BundledImageRef | StoredImageRef;
