import { SymbolTileCategoryKey } from "../symbol-tile-categories";
import { SymbolTileData } from "../symbol-tile-data";
import uuid from "react-native-uuid";

export function createMockSymbolTile(): SymbolTileData {
  return {
    key: uuid.v4(),
    vocalization: "Tile",
    category: SymbolTileCategoryKey.other,
    labelling: {
      text: "Tile",
      imgSrc: undefined,
    },
  };
}

export function createMockSymbolTiles(count: number): SymbolTileData[] {
  let result: SymbolTileData[] = [];
  for (let i = 0; i < count; i++) {
    let symbolTile = createMockSymbolTile();
    symbolTile.labelling.text = "Tile " + (i + 1);
    result.push(symbolTile);
  }
  return result;
}
