import React, { createContext, useContext, useState } from "react";
import { SymbolTileCategoryKey } from "../types/symbol-tile-categories";
import {
  DEFAULT_ADJECTIVE_CATEGORY_COLOR,
  DEFAULT_NOUN_CATEGORY_COLOR,
  DEFAULT_OTHER_CATEGORY_COLOR,
  DEFAULT_VERB_CATEGORY_COLOR,
} from "../constants/default-aac-preferences";

/**
 * Represents the properties of a user's preferences
 * for the AAC portion of Cognichat.
 */
type AACPrefsContextType = {
  /**
   * The default font size of the buttons, for new buttons
   * and buttons which do not override the font size.
   * @example 12
   */
  buttonDefaultFontSize: number;
  setButtonDefaultFontSize: React.Dispatch<React.SetStateAction<number>>;

  /**
   * The default font family of the buttons, for new buttons
   * and buttons which do not override the font family.
   * @example "arial"
   */
  buttonDefaultFontFamily: string;
  setButtonDefaultFontFamily: React.Dispatch<React.SetStateAction<string>>;

  /**
   * Machine learning feature:
   * Should sentence learning and prediction be enabled?
   * @example true
   */
  enableSentencePrediction: boolean;
  setEnableSentencePrediction: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Machine learning feature:
   * Should button grid learning and adaption be enabled?
   * @example true
   */
  enableButtonGridAdaption: boolean;
  setEnableButtonGridAdaption: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * The voice to use for text-to-speech, which is a string key.
   * Can be undefined, in which case the app should fall back to some
   * reasonable default voice, dependent on the voices that are actually
   * available on the user's device.
   * See {@link setTTSVoice} for the associated updater.
   */
  ttsVoice: string | undefined;
  setTTSVoice: React.Dispatch<React.SetStateAction<string | undefined>>;

  /**
   * Voice volume of the text-to-speech.
   * @example 100
   */
  ttsVolume: number;
  setTTSVolume: React.Dispatch<React.SetStateAction<number>>;

  /**
   * Should buttons show their image labels, if they
   * have them?
   * @example true
   */
  showButtonImageLabels: boolean;
  setShowButtonImageLabels: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Should buttons show their text labels, if they
   * have them?
   * @example true
   */
  showButtonTextLabels: boolean;
  setShowButtonTextLabels: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Should buttons be colored to their categories?
   * @example true
   */
  showButtonCategoryColors: boolean;
  setShowButtonCategoryColors: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Colors for the backgrounds of buttons based on categories.
   */
  buttonCategoryColors: Map<SymbolTileCategoryKey, string>;
  setButtonCategoryColors: React.Dispatch<
    React.SetStateAction<Map<SymbolTileCategoryKey, string>>
  >;
};

const AACPrefsContext = createContext<AACPrefsContextType | undefined>(
  undefined
);

export const AACPreferencesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [buttonDefaultFontSize, setButtonDefaultFontSize] =
    useState<number>(16);
  const [buttonDefaultFontFamily, setButtonDefaultFontFamily] =
    useState<string>("system-ui");
  const [enableSentencePrediction, setEnableSentencePrediction] =
    useState<boolean>(true);
  const [enableButtonGridAdaption, setEnableButtonGridAdaption] =
    useState<boolean>(true);
  const [ttsVoice, setTTSVoice] = useState<string | undefined>(undefined);
  const [ttsVolume, setTTSVolume] = useState<number>(50);
  const [showButtonCategoryColors, setShowButtonCategoryColors] =
    useState<boolean>(true);
  const [showButtonImageLabels, setShowButtonImageLabels] =
    useState<boolean>(true);
  const [showButtonTextLabels, setShowButtonTextLabels] =
    useState<boolean>(true);
  const [buttonCategoryColors, setButtonCategoryColors] = useState<
    Map<SymbolTileCategoryKey, string>
  >(
    new Map<SymbolTileCategoryKey, string>([
      [SymbolTileCategoryKey.other, DEFAULT_OTHER_CATEGORY_COLOR],
      [SymbolTileCategoryKey.noun, DEFAULT_NOUN_CATEGORY_COLOR],
      [SymbolTileCategoryKey.adjective, DEFAULT_ADJECTIVE_CATEGORY_COLOR],
      [SymbolTileCategoryKey.verb, DEFAULT_VERB_CATEGORY_COLOR],
    ])
  );

  const values = {
    buttonDefaultFontSize,
    setButtonDefaultFontSize,
    buttonDefaultFontFamily,
    setButtonDefaultFontFamily,
    enableSentencePrediction,
    setEnableSentencePrediction,
    enableButtonGridAdaption,
    setEnableButtonGridAdaption,
    ttsVoice,
    setTTSVoice,
    ttsVolume,
    setTTSVolume,
    showButtonCategoryColors,
    setShowButtonCategoryColors,
    showButtonImageLabels,
    setShowButtonImageLabels,
    showButtonTextLabels,
    setShowButtonTextLabels,
    buttonCategoryColors,
    setButtonCategoryColors,
  };

  return (
    <AACPrefsContext.Provider value={values}>
      {children}
    </AACPrefsContext.Provider>
  );
};

export const useAACPreferencesStore = () => {
  const context = useContext(AACPrefsContext);
  if (!context) throw new Error();
  return context;
};
