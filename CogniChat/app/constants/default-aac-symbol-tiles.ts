import { SymbolTileData } from "../types/symbol-tile-data";
import { SymbolTileTabData } from "../types/symbol-tile-tab-data";
import { aacBoardBuilder } from "./aac-board-builder";
import { SymbolTileCategoryKey } from "../types/symbol-tile-categories";
import createUniqueKey from "../utils/create-unique-key";

export function createDefaultAACSymbolTiles(): {
  defaultAllSymbolTiles: Record<string, SymbolTileData>;
  defaultAllTabs: Record<string, SymbolTileTabData>;
  defaultTabToSymbolTilesMap: Record<string, string[]>;
  defaultTab: string;
} {
  const builder = aacBoardBuilder();
  builder.createTab("Test");
  builder.createSymbolTile("Test", {
    key: createUniqueKey(),
    labelling: {
      text: "Yes",
      imgSrc: require("../assets/yes.svg"),
    },
    vocalization: "Yes",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile("Test", {
    key: createUniqueKey(),
    labelling: {
      text: "No",
      imgSrc: require("../assets/no.svg"),
    },
    vocalization: "No",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile("Test", {
    key: createUniqueKey(),
    labelling: {
      text: "Want",
      imgSrc: require("../assets/want.jpg"),
    },
    vocalization: "Want",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile("Test", {
    key: createUniqueKey(),
    labelling: {
      text: "Want",
      imgSrc: require("../assets/want.jpg"),
    },
    vocalization: "Want",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile("Test", {
    key: createUniqueKey(),
    labelling: {
      text: "Want",
      imgSrc: require("../assets/want.jpg"),
    },
    vocalization: "Want",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile("Test", {
    key: createUniqueKey(),
    labelling: {
      text: "Want",
      imgSrc: require("../assets/want.jpg"),
    },
    vocalization: "Want",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile("Test", {
    key: createUniqueKey(),
    labelling: {
      text: undefined,
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
