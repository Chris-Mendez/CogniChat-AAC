import React, { JSX } from "react";
import { StyleSheet } from "react-native";
import SettingsRow from "./settings-row";
import { Picker } from "@react-native-picker/picker";
import { useAACPreferencesStore } from "@/app/contexts/aac-preferences-provider";
import { AVAILABLE_FONT_SIZES } from "@/app/constants/default-aac-preferences";

interface ControlFontSizeProps {}

export const ControlFontSize: React.FC<
  ControlFontSizeProps
> = ({}: ControlFontSizeProps): JSX.Element => {
  const { buttonDefaultFontSize, setButtonDefaultFontSize } =
    useAACPreferencesStore();

  return (
    <SettingsRow
      title="Font Size"
      help="Use a font size that is easiest for you to see."
    >
      <Picker
        selectedValue={buttonDefaultFontSize}
        onValueChange={setButtonDefaultFontSize}
      >
        {Object.entries(AVAILABLE_FONT_SIZES).map(([key, name]) => (
          <Picker.Item label={name} value={key} key={key} />
        ))}
      </Picker>
    </SettingsRow>
  );
};

const styles = StyleSheet.create({});

export default ControlFontSize;
