import { ImageSourcePropType } from "react-native";
import { HasKey } from "@/app/types/has-key";
import { SymbolTileCategoryKey } from "@/app/types/symbol-tile-categories";

/**
 * Represents the properties of a symbol tile.
 *
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
   * The text label of this symbol tile.
   * @example "Hello"
   */
  textLabelText: string | undefined;

  /**
   * Should the text label be shown?
   * @example false
   */
  showTextLabel: boolean;

  /**
   * The image label of this symbol tile.
   * @example "require('./assets/example.png');" for
   * local images.
   * "{uri: 'https://example.com/remote.jpg'};"
   * for remote images.
   */
  imageLabelSource: ImageSourcePropType | undefined;

  /**
   * Should the image label be shown?
   * @example false
   */
  showImageLabel: boolean;

  /**
   * The font family for the text label.
   * @example "arial"
   */
  textLabelFontFamily: string;

  /**
   * The text size for the text label.
   * @example 12
   */
  textLabelFontSize: number;

  /**
   * The text used for vocalization. If not
   * defined, textLabel should be used instead.
   * @example "Hello"
   */
  vocalizationText: string | undefined;

  /**
   * The category in which this symbol tile
   * belongs to.
   */
  category: SymbolTileCategoryKey;
}
