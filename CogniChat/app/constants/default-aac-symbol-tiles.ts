import { SymbolTileData } from "../types/symbol-tile-data";
import { SymbolTileTabData } from "../types/symbol-tile-tab-data";
import uuid from "react-native-uuid";
import { symbolTileBuilder } from "./aac-symbol-tiles-builder";
import { SymbolTileCategoryKey } from "../types/symbol-tile-categories";

export function createDefaultAACSymbolTiles(): {
  defaultAllSymbolTiles: Record<string, SymbolTileData>;
  defaultAllTabs: Record<string, SymbolTileTabData>;
  defaultTabToSymbolTilesMap: Record<string, string[]>;
  defaultTab: string;
} {
  const builder = symbolTileBuilder();
  builder.createTab("Test");
  builder.createSymbolTile("Test", {
    key: uuid.v4(),
    textLabelText: "Yes",
    showTextLabel: true,
    imageLabelSource: require("../assets/yes.svg"),
    showImageLabel: true,
    textLabelFontFamily: "",
    textLabelFontSize: 12,
    vocalizationText: undefined,
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile("Test", {
    key: uuid.v4(),
    textLabelText: "No",
    showTextLabel: true,
    imageLabelSource: require("../assets/no.svg"),
    showImageLabel: true,
    textLabelFontFamily: "",
    textLabelFontSize: 12,
    vocalizationText: undefined,
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile("Test", {
    key: uuid.v4(),
    textLabelText: "Want",
    showTextLabel: true,
    imageLabelSource: require("../assets/want.jpg"),
    showImageLabel: true,
    textLabelFontFamily: "",
    textLabelFontSize: 12,
    vocalizationText: undefined,
    category: SymbolTileCategoryKey.other,
  });

  return {
    defaultAllSymbolTiles: builder.allSymbolTiles,
    defaultAllTabs: builder.allTabs,
    defaultTabToSymbolTilesMap: builder.tabToSymbolTileMap,
    defaultTab: Object.keys(builder.allTabs)[0],
  };
}
