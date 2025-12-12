import { ImageSourcePropType } from "react-native";
import { HasKey } from "@/app/types/has-key";
import { SymbolTileCategoryKey } from "@/app/types/symbol-tile-categories";

/**
 * @remarks
 * This interface defines the important properties of a
 * symbol tile, which is essentially just an image and
 * some text. I believe it's a good idea to
 * make this abstraction so that symbol tiles can be
 * reused throughout the application. For example, symbol
 * tiles are used in both the symbol tile grid and
 * sentence bar composor.
 */
export interface SymbolTileData extends HasKey {
  /**
   * The labels for this symbol tile. Must
   * be
   */
  labelling: ImageLabelOnly | TextLabelOnly | BothImageAndTextLabel;

  /**
   * The text used for text-to-speech.
   * @example "Hello"
   */
  vocalization: string;

  /**
   * The category in which this symbol tile
   * belongs to.
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
