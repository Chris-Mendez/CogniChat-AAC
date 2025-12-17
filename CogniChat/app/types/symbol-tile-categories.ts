/**
 * @remarks
 * Categories are hardcoded; users cannot add or remove them.
 * See {@link SymbolTileCategoryProperties} and
 * {@link SymbolTileCategoryKeyDetails} for the properties
 * associated with each key/category.
 */
export enum SymbolTileCategoryKey {
  other,
  noun,
  adjective,
  verb,
}

export interface SymbolTileCategoryKeyDetails {
  singular: string;
  plural: string;
}

export const SymbolTileCategoryProperties: Record<
  SymbolTileCategoryKey,
  SymbolTileCategoryKeyDetails
> = {
  [SymbolTileCategoryKey.other]: { singular: "Other", plural: "Other" },
  [SymbolTileCategoryKey.noun]: { singular: "Noun", plural: "Nouns" },
  [SymbolTileCategoryKey.adjective]: {
    singular: "Adjective",
    plural: "Adjectives",
  },
  [SymbolTileCategoryKey.verb]: { singular: "Verb", plural: "Verbs" },
};
