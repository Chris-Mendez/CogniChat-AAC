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
    labelling: {
      text: "Yes",
      imgSrc: require("../assets/yes.svg"),
    },
    vocalization: "Yes",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile("Test", {
    key: uuid.v4(),
    labelling: {
      text: "No",
      imgSrc: require("../assets/no.svg"),
    },
    vocalization: "No",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile("Test", {
    key: uuid.v4(),
    labelling: {
      text: "Want",
      imgSrc: require("../assets/want.jpg"),
    },
    vocalization: "Want",
    category: SymbolTileCategoryKey.other,
  });

  return {
    defaultAllSymbolTiles: builder.allSymbolTiles,
    defaultAllTabs: builder.allTabs,
    defaultTabToSymbolTilesMap: builder.tabToSymbolTileMap,
    defaultTab: Object.keys(builder.allTabs)[0],
  };
}
