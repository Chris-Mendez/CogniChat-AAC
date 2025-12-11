import { createMockSymbolTiles } from "@/app/types/__mocks__/symbol-tile-mock";
import { SymbolTileData } from "@/app/types/symbol-tile-data";
import { SymbolTileTabData } from "@/app/types/symbol-tile-tab-data";
import { randInt } from "@/app/utils/random-integer";
import { shuffle } from "@/app/utils/shuffle-array";

const NUMBER_OF_SYMBOL_TILES = 60;
const NUMBER_OF_TABS = 20;

export function createMockAACSymbolTiles(): {
  mockAllSymbolTiles: Record<string, SymbolTileData>;
  mockAllTabs: Record<string, SymbolTileTabData>;
  mockTabToSymbolTilesMap: Record<string, string[]>;
  mockDefaultTab: string;
} {
  const randomSymbolTiles = createMockSymbolTiles(NUMBER_OF_SYMBOL_TILES);

  const mockAllSymbolTiles: Record<string, SymbolTileData> = {};
  for (const s of randomSymbolTiles) {
    mockAllSymbolTiles[s.key] = s;
  }

  const mockAllTabs: Record<string, SymbolTileTabData> = {};
  for (let i = 0; i < NUMBER_OF_TABS; i++) {
    const id = `tab-${i + 1}`;
    mockAllTabs[id] = {
      key: id,
      name: `Tab ${i + 1}`,
    };
  }

  const mockTabToSymbolTilesMap: Record<string, string[]> = {};

  Object.keys(mockAllTabs).forEach((tabId) => {
    const randomIds = shuffle([...randomSymbolTiles.map((d) => d.key)]);
    const count = randInt(3, NUMBER_OF_SYMBOL_TILES);
    const selected = randomIds.slice(0, count);
    mockTabToSymbolTilesMap[tabId] = selected;
  });

  const mockDefaultTab = Object.keys(mockAllTabs)[0];

  return {
    mockAllSymbolTiles,
    mockAllTabs,
    mockTabToSymbolTilesMap,
    mockDefaultTab,
  };
}
