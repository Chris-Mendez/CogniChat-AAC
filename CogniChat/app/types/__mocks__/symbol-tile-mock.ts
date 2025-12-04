import { SymbolTileData } from "../symbol-tile-data";
import uuid from "react-native-uuid";

export function createMockSymbolTile(): SymbolTileData {
  return {
    id: uuid.v4(),
    textLabelText: "Tile",
    showTextLabel: true,
    imageLabelSource: require("../../assets/300x300.png"),
    showImageLabel: true,
    textLabelFontFamily: "arial",
    textLabelFontSize: 12,
    vocalizationText: "Vocalize",
    category: "other",
  };
}

export function createMockSymbolTiles(count: number): SymbolTileData[] {
  let result: SymbolTileData[] = [];
  for (let i = 0; i < count; i++) {
    let symbolTile = createMockSymbolTile();
    symbolTile.textLabelText = "Tile " + (i + 1);
    result.push(symbolTile);
  }
  return result;
}
