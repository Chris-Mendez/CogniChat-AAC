import { HasKey } from "@/app/types/has-key";

/**
 * @remarks
 * Represents the properties of a symbol tile tab, which is
 * essentially just a named collection of symbol tiles.
 */
export interface SymbolTileTabData extends HasKey {
  /**
   * The unique id of this symbol tile tab.
   */
  key: string;

  /**
   * The name of this symbol tile tab as it is displayed
   * and configured by the user.
   * @example "Feelings"
   */
  name: string;
}
