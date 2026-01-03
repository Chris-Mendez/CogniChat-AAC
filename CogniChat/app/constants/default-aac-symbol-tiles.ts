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
  builder.createTab("Test tab 1");
  builder.createTab("Test tab 2");
  builder.createTab("Test tab 3");
  builder.createSymbolTile(["Test tab 1", "Test tab 2"], {
    key: createUniqueKey(),
    textLabel: "Yes",
    imageLabel: {
      kind: "bundled",
      source: require("../assets/yes.svg"),
    },
    vocalization: "Yes",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 1", "Test tab 2"], {
    key: createUniqueKey(),
    textLabel: "No",
    imageLabel: {
      kind: "bundled",
      source: require("../assets/no.svg"),
    },
    vocalization: "No",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 1", "Test tab 2"], {
    key: createUniqueKey(),
    textLabel: "Want",
    imageLabel: {
      kind: "bundled",
      source: require("../assets/want.jpg"),
    },
    vocalization: "Want",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    textLabel: "1",
    imageLabel: undefined,
    vocalization: "One",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    textLabel: "2",
    imageLabel: undefined,
    vocalization: "Two",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    textLabel: "3",
    imageLabel: undefined,
    vocalization: "Three",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    textLabel: "4",
    imageLabel: undefined,
    vocalization: "Four",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    textLabel: "5",
    imageLabel: undefined,
    vocalization: "Five",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    textLabel: "6",
    imageLabel: undefined,
    vocalization: "Six",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    textLabel: "7",
    imageLabel: undefined,
    vocalization: "Seven",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    textLabel: "8",
    imageLabel: undefined,
    vocalization: "Eight",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    textLabel: "9",
    imageLabel: undefined,
    vocalization: "Nine",
    category: SymbolTileCategoryKey.other,
  });

  return {
    defaultAllSymbolTiles: builder.allSymbolTiles,
    defaultAllTabs: builder.allTabs,
    defaultTabToSymbolTilesMap: builder.tabToSymbolTileMap,
    defaultTab: Object.keys(builder.allTabs)[0],
  };
}
