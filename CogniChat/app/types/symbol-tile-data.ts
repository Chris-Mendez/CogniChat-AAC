import { ImageSourcePropType } from "react-native";
import { HasKey } from "@/app/types/has-key";
import { SymbolTileCategoryKey } from "@/app/types/symbol-tile-categories";

/**
 * This interface defines the important properties of a
 * symbol tile. A symbol tile can be thought of as a button
 * with an image and/or text label.
 */
export interface SymbolTileData extends HasKey {
  /**
   * The labelling for this symbol tile. It can have only
   * an image or only text or both an image and text but
   * never neither.
   */
  labelling: ImageLabelOnly | TextLabelOnly | BothImageAndTextLabel;

  /**
   * The actual text used for text-to-speech.
   * @example "Hello"
   */
  vocalization: string;

  /**
   * The category in which this symbol tile belongs to.
   */
  category: SymbolTileCategoryKey;
}

interface ImageLabelOnly {
  /**
   * The image label of this symbol tile.
   * @example "require('./assets/example.png');" for
   * local images.
   * "{uri: 'https://example.com/remote.jpg'};"
   * for remote images.
   */
  imgSrc: ImageSourcePropType;
  text: undefined;
}

interface TextLabelOnly {
  /**
   * The text label of this symbol tile.
   * @example "Hello"
   */
  text: string;
  imgSrc: undefined;
}

interface BothImageAndTextLabel {
  imgSrc: ImageSourcePropType;
  text: string;
}
