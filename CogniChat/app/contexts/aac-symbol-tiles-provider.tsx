import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { SymbolTileData } from "../types/symbol-tile-data";
import { SymbolTileTabData } from "../types/symbol-tile-tab-data";
import { createMockAACSymbolTiles } from "./__mocks__/aac-symbol-tiles-mock";
import { createDefaultAACSymbolTiles } from "../constants/default-aac-symbol-tiles";

type SymbolTileMap = Record<string, SymbolTileData>;
type TabMap = Record<string, SymbolTileTabData>;
type TabToSymbolTilesMap = Record<string, string[]>;

type AACSymbolTilesContextType = {
  /**
   * Represents all symbol tiles using a map from each symbol tile's
   * unique key to its properties.
   */
  allSymbolTiles: SymbolTileMap;

  /**
   * Represents all tabs using a map from each tab's unique key
   * to its properties.
   */
  allTabs: TabMap;

  /**
   * Represents which symbol tiles belong to which tabs by mapping
   * each tab's unique key to an ordered array of unique symbol
   * tile keys.
   */
  tabToSymbolTilesMap: TabToSymbolTilesMap;

  /**
   * The key of the currently selected tab.
   */
  activeTabId: string;
  setActiveTabId: (id: string) => void;

  /**
   * The ordered array of symbol tiles in the currently active
   * tab. Convenience function to avoid having to go through
   * tabToSymbolTilesMap and allSymbolTiles.
   */
  activeTabSymbolTiles: SymbolTileData[];

  /**
   * Create a new tab. Automatically updates the tab to symbol
   * tile mapping.
   */
  addTab: (tab: SymbolTileTabData) => void;

  /**
   * Delete a tab.
   */
  removeTab: (tabId: string) => void;

  addSymbolTile: (data: SymbolTileData) => void;
  updateSymbolTile: (data: SymbolTileData) => void;
  deleteSymbolTile: (key: string) => void;
  addSymbolTileToTab: (tabId: string, dataId: string) => void;
  removeSymbolTileFromTab: (tabId: string, dataId: string) => void;

  /**
   * Get the order of the symbol tiles in the active tab.
   */
  activeTabOrder: string[];

  /**
   * Update the order of the symbol tiles in the active tab.
   */
  setActiveTabOrder: (updater: (prev: string[]) => string[]) => void;

  /**
   * Represents the ordered array of symbol tiles that were added
   * and are currently active inside the sentence composer bar.
   */
  sentence: SymbolTileData[];
  setSentence: React.Dispatch<React.SetStateAction<SymbolTileData[]>>;
};

const AACSymbolTilesContext = createContext<
  AACSymbolTilesContextType | undefined
>(undefined);

export const AACSymbolTilesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // temporary -- for testing
  // (this is also how you populate the app with data)
  /*
  const {
    mockAllSymbolTiles: allSymbolTilesData,
    mockAllTabs: allTabsData,
    mockTabToSymbolTilesMap: tabToSymbolTilesMapData,
    mockDefaultTab: defaultTabData,
  } = createMockAACSymbolTiles();
   */
  const {
    defaultAllSymbolTiles: allSymbolTilesData,
    defaultAllTabs: allTabsData,
    defaultTabToSymbolTilesMap: tabToSymbolTilesMapData,
    defaultTab: defaultTabData,
  } = createDefaultAACSymbolTiles();

  const [allSymbolTiles, setAllSymbolTiles] =
    useState<SymbolTileMap>(allSymbolTilesData);
  const [allTabs, setAllTabs] = useState<TabMap>(allTabsData);
  const [tabToSymbolTilesMap, setTabToSymbolTilesMap] =
    useState<TabToSymbolTilesMap>(tabToSymbolTilesMapData);
  const [activeTabId, setActiveTabId] = useState<string>(defaultTabData);
  const [sentence, setSentence] = useState<SymbolTileData[]>([]);

  const activeTabSymbolTiles = useMemo(() => {
    if (!activeTabId) return [];
    const ids = tabToSymbolTilesMap[activeTabId] || [];
    return ids.map((id) => allSymbolTiles[id]).filter(Boolean);
  }, [activeTabId, tabToSymbolTilesMap, allSymbolTiles]);

  const addTab = (tab: SymbolTileTabData) => {
    setAllTabs((prev) => ({ ...prev, [tab.key]: tab }));
    setTabToSymbolTilesMap((prev) => ({ ...prev, [tab.key]: [] }));
  };

  const removeTab = (tabId: string) => {
    setAllTabs((prev) => {
      const { [tabId]: _, ...rest } = prev;
      return rest;
    });
    setTabToSymbolTilesMap((prev) => {
      const { [tabId]: _, ...rest } = prev;
      return rest;
    });
  };

  const addSymbolTile = (data: SymbolTileData) => {
    setAllSymbolTiles((prev) => ({ ...prev, [data.key]: data }));
  };

  const updateSymbolTile = (data: SymbolTileData) => {
    setAllSymbolTiles((prev) => ({ ...prev, [data.key]: data }));
  };

  const deleteSymbolTile = (dataId: string) => {
    setAllSymbolTiles((prev) => {
      const { [dataId]: _, ...rest } = prev;
      return rest;
    });
    setTabToSymbolTilesMap((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([tabId, ids]) => [
          tabId,
          ids.filter((id) => id !== dataId),
        ])
      )
    );
  };

  const addSymbolTileToTab = (tabId: string, dataId: string) => {
    setTabToSymbolTilesMap((prev) => ({
      ...prev,
      [tabId]: [...(prev[tabId] || []), dataId],
    }));
  };

  const removeSymbolTileFromTab = (tabId: string, dataId: string) => {
    setTabToSymbolTilesMap((prev) => ({
      ...prev,
      [tabId]: prev[tabId].filter((id) => id !== dataId),
    }));
  };

  const activeTabOrder = useMemo((): string[] => {
    return tabToSymbolTilesMap[activeTabId!] ?? [];
  }, [tabToSymbolTilesMap, activeTabId]);

  const setActiveTabOrder = (updater: (prev: string[]) => string[]) => {
    if (!activeTabId) return;
    setTabToSymbolTilesMap((prev) => {
      const prevOrder = prev[activeTabId] ?? [];
      const nextOrder = updater(prevOrder);
      return {
        ...prev,
        [activeTabId]: nextOrder,
      };
    });
  };

  return (
    <AACSymbolTilesContext.Provider
      value={{
        allSymbolTiles,
        allTabs,
        tabToSymbolTilesMap,

        activeTabId,
        setActiveTabId,
        activeTabSymbolTiles,

        addTab,
        removeTab,
        addSymbolTile,
        updateSymbolTile,
        deleteSymbolTile,
        addSymbolTileToTab,
        removeSymbolTileFromTab,

        activeTabOrder,
        setActiveTabOrder,

        sentence,
        setSentence,
      }}
    >
      {children}
    </AACSymbolTilesContext.Provider>
  );
};

export const useAACSymbolTilesStore = () => {
  const context = useContext(AACSymbolTilesContext);
  if (!context) throw new Error();
  return context;
};
