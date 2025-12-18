import { SymbolTileTabData } from "../types/symbol-tile-tab-data";
import { SymbolTileData } from "../types/symbol-tile-data";
import createUniqueKey from "../utils/create-unique-key";

export function aacBoardBuilder() {
  const allTabs: Record<string, SymbolTileTabData> = {};
  const allSymbolTiles: Record<string, SymbolTileData> = {};
  const tabToSymbolTileMap: Record<string, string[]> = {};

  function createTab(name: string): SymbolTileTabData {
    const tab: SymbolTileTabData = { key: createUniqueKey(), name };
    allTabs[tab.key] = tab;
    tabToSymbolTileMap[tab.key] = [];
    return tab;
  }

  function createSymbolTile(
    tabName: string[],
    data: SymbolTileData
  ): SymbolTileData {
    allSymbolTiles[data.key] = data;
    for (let i = 0; i < tabName.length; i++) {
      const tabKey = Object.entries(allTabs)
        .filter(([_, tab]) => {
          return tab.name === tabName[i];
        })
        .map(([key, _]) => {
          return key;
        })[0];
      tabToSymbolTileMap[tabKey].push(data.key);
    }
    return data;
  }

  return {
    createTab,
    createSymbolTile,

    get allTabs() {
      return allTabs;
    },
    get allSymbolTiles() {
      return allSymbolTiles;
    },
    get tabToSymbolTileMap() {
      return tabToSymbolTileMap;
    },
  };
}
