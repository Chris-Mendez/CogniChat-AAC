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
    labelling: {
      text: "Yes",
      imgSrc: require("../assets/yes.svg"),
    },
    vocalization: "Yes",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 1", "Test tab 2"], {
    key: createUniqueKey(),
    labelling: {
      text: "No",
      imgSrc: require("../assets/no.svg"),
    },
    vocalization: "No",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 1", "Test tab 2"], {
    key: createUniqueKey(),
    labelling: {
      text: "Want",
      imgSrc: require("../assets/want.jpg"),
    },
    vocalization: "Want",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    labelling: {
      text: "1",
      imgSrc: undefined,
    },
    vocalization: "One",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    labelling: {
      text: "2",
      imgSrc: undefined,
    },
    vocalization: "Two",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    labelling: {
      text: "3",
      imgSrc: undefined,
    },
    vocalization: "Three",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    labelling: {
      text: "4",
      imgSrc: undefined,
    },
    vocalization: "Four",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    labelling: {
      text: "5",
      imgSrc: undefined,
    },
    vocalization: "Five",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    labelling: {
      text: "6",
      imgSrc: undefined,
    },
    vocalization: "Six",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    labelling: {
      text: "7",
      imgSrc: undefined,
    },
    vocalization: "Seven",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    labelling: {
      text: "8",
      imgSrc: undefined,
    },
    vocalization: "Eight",
    category: SymbolTileCategoryKey.other,
  });
  builder.createSymbolTile(["Test tab 3"], {
    key: createUniqueKey(),
    labelling: {
      text: "9",
      imgSrc: undefined,
    },
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
