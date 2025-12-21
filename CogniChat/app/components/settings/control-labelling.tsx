import React, { JSX } from "react";
import { StyleSheet, Switch } from "react-native";
import SettingsRow from "./settings-row";
import { useAACPreferencesStore } from "@/app/contexts/aac-preferences-provider";

interface ControlFontSizeProps {}

export const ControlFontSize: React.FC<
  ControlFontSizeProps
> = ({}: ControlFontSizeProps): JSX.Element => {
  const {
    showButtonTextLabels,
    setShowButtonTextLabels,
    showButtonImageLabels,
    setShowButtonImageLabels,
  } = useAACPreferencesStore();

  const toggleShowImageLabels = (v: boolean) => {
    if (!v && !showButtonTextLabels) {
      setShowButtonTextLabels(true);
    }
    setShowButtonImageLabels(v);
  };

  const toggleShowTextLabels = (v: boolean) => {
    if (!v && !showButtonImageLabels) {
      setShowButtonImageLabels(true);
    }
    setShowButtonTextLabels(v);
  };

  return (
    <>
      <SettingsRow title="Show Image Labels" help="Should buttons have images?">
        <Switch
          value={showButtonImageLabels}
          onValueChange={toggleShowImageLabels}
        />
      </SettingsRow>
      <SettingsRow title="Show Text labels" help="Should buttons have text?">
        <Switch
          value={showButtonTextLabels}
          onValueChange={toggleShowTextLabels}
        />
      </SettingsRow>
    </>
  );
};

const styles = StyleSheet.create({});

export default ControlFontSize;
