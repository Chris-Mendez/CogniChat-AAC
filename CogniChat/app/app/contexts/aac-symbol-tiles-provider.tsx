import React, { createContext, useContext, useState } from "react";
import { SymbolTileData } from "../types/symbol-tile-data";
import { createMockSymbolTiles } from "../types/__mocks__/symbol-tile-mock";

type AACSymbolTilesContextType = {
  tabTiles: SymbolTileData[];
  setTabTiles: (n: SymbolTileData[]) => void;
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  sentence: SymbolTileData[];
  setSentence: React.Dispatch<React.SetStateAction<SymbolTileData[]>>;
};

const AACSymbolTilesContext = createContext<
  AACSymbolTilesContextType | undefined
>(undefined);

export const AACSymbolTilesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [allTiles, setAllTiles] = useState<any[][]>([
    createMockSymbolTiles(30),
  ]);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [sentence, setSentence] = useState<SymbolTileData[]>([]);

  const values = {
    tabTiles: allTiles[tabIndex],
    setTabTiles: (n: SymbolTileData[]) => {
      setAllTiles((p) => {
        const copy = [...p];
        copy[tabIndex] = n;
        return copy;
      });
    },
    tabIndex,
    setTabIndex,
    sentence,
    setSentence,
  };

  return (
    <AACSymbolTilesContext.Provider value={values}>
      {children}
    </AACSymbolTilesContext.Provider>
  );
};

export const useAACSymbolTilesStore = () => {
  const context = useContext(AACSymbolTilesContext);
  if (!context) throw new Error();
  return context;
};
