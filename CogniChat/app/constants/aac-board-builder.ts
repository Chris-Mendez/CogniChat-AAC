import uuid from "react-native-uuid";
import { SymbolTileTabData } from "../types/symbol-tile-tab-data";
import { SymbolTileData } from "../types/symbol-tile-data";

export function aacBoardBuilder() {
  const allTabs: Record<string, SymbolTileTabData> = {};
  const allSymbolTiles: Record<string, SymbolTileData> = {};
  const tabToSymbolTileMap: Record<string, string[]> = {};

  function createTab(name: string): SymbolTileTabData {
    const tab: SymbolTileTabData = { key: uuid.v4(), name };
    allTabs[tab.key] = tab;
    tabToSymbolTileMap[tab.key] = [];
    return tab;
  }

  function createSymbolTile(
    tabName: string,
    data: SymbolTileData
  ): SymbolTileData {
    const tabKey = Object.entries(allTabs)
      .filter(([_, tab]) => {
        return tab.name === tabName;
      })
      .map(([key, _]) => {
        return key;
      })[0];
    allSymbolTiles[data.key] = data;
    tabToSymbolTileMap[tabKey].push(data.key);
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
