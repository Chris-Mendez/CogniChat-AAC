import React, { JSX } from "react";
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
    <Picker
      selectedValue={buttonDefaultFontSize}
      onValueChange={setButtonDefaultFontSize}
    >
      {Object.entries(AVAILABLE_FONT_SIZES).map(([key, name]) => (
        <Picker.Item label={name} value={key} key={key} />
      ))}
    </Picker>
  );
};

export default ControlFontSize;
