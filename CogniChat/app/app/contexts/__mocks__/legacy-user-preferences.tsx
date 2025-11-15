import { SymbolTileData } from "@/app/types/symbol-tile-data";
import React, { createContext, useContext, useState } from "react";

type UserPreferences = {
  gridSize: number;
  buttonColor: string;
  userTiles: SymbolTileData[];
};

type PreferencesContextType = {
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined
);

export const UserPreferencesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    gridSize: 50,
    buttonColor: "#4a90e2",
    userTiles: [],
  });

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context)
    throw new Error(
      "The useUserPreferences function can only be used within a UserPreferencesProvider"
    );
  return context;
};
