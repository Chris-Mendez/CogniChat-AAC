/**
 * Enumeration of all available symbol tile categories.
 *
 * @remarks
 * Categories are hardcoded; users cannot add or remove them. They
 * can, however, change the colors of the categories. Each
 * key corresponds to a default entry in the "categories" map.
 * This key is for internal use.
 */
export type SymbolTileCategoryKey = "other" | "noun" | "adjective" | "verb";

/**
 * Represents the properties of a symbol tile category.
 */
export interface SymbolTileCategory {
  /**
   * The color associated with this category. Used for defining the
   * background of a symbol tile.
   */
  color: string;

  /**
   * The name of this category as it should be displayed in
   * the user interface.
   */
  displayName: string;
}

/**
 * A hardcoded array of all categories and their default properties.
 *
 * @remarks
 * Every {@link CategoryKey} value has an entry.
 */
export const symbolTileCategories: Record<
  SymbolTileCategoryKey,
  SymbolTileCategory
> = {
  other: { color: "#ffffff", displayName: "Other" },
  noun: { color: "#ff6666", displayName: "Noun" },
  adjective: { color: "#66cc66", displayName: "Adjective" },
  verb: { color: "#6699ff", displayName: "Verb" },
};
