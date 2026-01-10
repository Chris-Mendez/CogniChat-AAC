import React, { JSX } from "react";
import { StyleSheet, Switch } from "react-native";
import { useAACPreferencesStore } from "@/app/contexts/aac-preferences-provider";
import { AVAILABLE_CATEGORY_COLORS } from "@/app/constants/default-aac-preferences";
import CategoryColorSelector from "../category-color-selector";

interface ControlColorCodingProps {}

export const ControlColorCoding: React.FC<
  ControlColorCodingProps
> = ({}: ControlColorCodingProps): JSX.Element => {
  const {
    showButtonCategoryColors,
    setShowButtonCategoryColors,
    buttonCategoryColors,
    setButtonCategoryColors,
  } = useAACPreferencesStore();

  return (
    <>
      <Switch
        value={showButtonCategoryColors}
        onValueChange={setShowButtonCategoryColors}
      />
      {showButtonCategoryColors && (
        <CategoryColorSelector
          selectedColors={buttonCategoryColors}
          setSelectedColors={setButtonCategoryColors}
          availableColors={AVAILABLE_CATEGORY_COLORS}
        />
      )}
    </>
  );
};

export default ControlColorCoding;
