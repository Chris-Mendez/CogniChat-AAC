import React, { createContext, useContext, useMemo, useState } from "react";
import { SymbolTileData } from "../types/symbol-tile-data";
import { SymbolTileTabData } from "../types/symbol-tile-tab-data";
import { createMockAppState } from "./__mocks__/aac-symbol-tiles-mock";

type SymbolTileMap = Record<string, SymbolTileData>;
type TabMap = Record<string, SymbolTileTabData>;
type TabToSymbolTilesMap = Record<string, string[]>;

type AACSymbolTilesContextType = {
  allSymbolTiles: SymbolTileMap; // map from button id to button properties
  allTabs: TabMap; // map from tab id to tab properties
  tabToSymbolTilesMap: TabToSymbolTilesMap; // map from tab id to button ids

  activeTabId: string;
  setActiveTabId: (id: string) => void;
  activeTabSymbolTiles: SymbolTileData[];

  addTab: (tab: SymbolTileTabData) => void;
  removeTab: (tabId: string) => void;
  addSymbolTile: (data: SymbolTileData) => void;
  updateSymbolTile: (data: SymbolTileData) => void;
  deleteSymbolTile: (key: string) => void;

  addSymbolTileToTab: (tabId: string, dataId: string) => void;
  removeSymbolTileFromTab: (tabId: string, dataId: string) => void;
  swapItemsInActiveTab: (from: number, to: number) => void;

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
  const {
    mockAllSymbolTiles,
    mockAllTabs,
    mockTabToSymbolTilesMap,
    mockDefaultTab,
  } = createMockAppState();

  const [allSymbolTiles, setAllSymbolTiles] =
    useState<SymbolTileMap>(mockAllSymbolTiles);
  const [allTabs, setAllTabs] = useState<TabMap>(mockAllTabs);
  const [tabData, setTabData] = useState<TabToSymbolTilesMap>(
    mockTabToSymbolTilesMap
  );
  const [activeTabId, setActiveTabId] = useState<string>(mockDefaultTab);
  const [sentence, setSentence] = useState<SymbolTileData[]>([]);

  const activeTabSymbolTiles = useMemo(() => {
    if (!activeTabId) return [];
    const ids = tabData[activeTabId] || [];
    return ids.map((id) => allSymbolTiles[id]).filter(Boolean);
  }, [activeTabId, tabData, allSymbolTiles]);

  const addTab = (tab: SymbolTileTabData) => {
    setAllTabs((prev) => ({ ...prev, [tab.key]: tab }));
    setTabData((prev) => ({ ...prev, [tab.key]: [] }));
  };

  const removeTab = (tabId: string) => {
    setAllTabs((prev) => {
      const { [tabId]: _, ...rest } = prev;
      return rest;
    });
    setTabData((prev) => {
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
    setTabData((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([tabId, ids]) => [
          tabId,
          ids.filter((id) => id !== dataId),
        ])
      )
    );
  };

  const addSymbolTileToTab = (tabId: string, dataId: string) => {
    setTabData((prev) => ({
      ...prev,
      [tabId]: [...(prev[tabId] || []), dataId],
    }));
  };

  const removeSymbolTileFromTab = (tabId: string, dataId: string) => {
    setTabData((prev) => ({
      ...prev,
      [tabId]: prev[tabId].filter((id) => id !== dataId),
    }));
  };

  const swapItemsInActiveTab = (from: number, to: number) => {
    setTabData((prev) => {
      const ids = [...prev[activeTabId]];
      const [moved] = ids.splice(from, 1);
      ids.splice(to, 0, moved);
      return {
        ...prev,
        [activeTabId]: ids,
      };
    });
  };

  return (
    <AACSymbolTilesContext.Provider
      value={{
        allSymbolTiles,
        allTabs,
        tabToSymbolTilesMap: tabData,

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
        swapItemsInActiveTab,

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
