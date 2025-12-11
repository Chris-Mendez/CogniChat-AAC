/**
 * @remarks
 * Categories are hardcoded; users cannot add or remove them.
 * See {@link SymbolTileCategoryProperties} for properties associated
 * with each key. See {@link SymbolTileCategoryKeyDetails} for the
 * properteries available.
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
