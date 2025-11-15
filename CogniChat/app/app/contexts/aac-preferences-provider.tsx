import React, { createContext, useContext, useState } from "react";
import {
  AACPreferences,
  defaultAACPreferences,
} from "../types/aac-preferences";

type AACPrefsContextType = {
  preferences: AACPreferences;
  updatePreferences: React.Dispatch<React.SetStateAction<AACPreferences>>;
};

const AACPrefsContext = createContext<AACPrefsContextType | undefined>(
  undefined
);

export const AACPreferencesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [preferences, setPreferences] = useState<AACPreferences>(
    defaultAACPreferences
  );

  return (
    <AACPrefsContext.Provider
      value={{ preferences, updatePreferences: setPreferences }}
    >
      {children}
    </AACPrefsContext.Provider>
  );
};

export const useAACPreferencesStore = () => {
  const context = useContext(AACPrefsContext);
  if (!context) throw new Error();
  return context;
};
