import React, { JSX } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SymbolTileData } from "../types/symbol-tile-data";
import { useAACPreferencesStore } from "../contexts/aac-preferences-provider";
import { getContrastYIQ } from "../utils/color-helper";
import SymbolTileImage from "./symbol-tile-image";

/**
 * @interface SymbolTileProps
 *
 * @property {SymbolTileData} symbolTileData - Symbol data
 */
interface SymbolTileProps {
  symbolTileData: SymbolTileData;
  hideCategoryColor?: boolean;
}

/**
 * A component for rendering a symbol tile.
 *
 * @param {SymbolTileProps} props - {@link SymbolTileProps}
 * @returns {JSX.Element} A React Native component.
 */
export const SymbolTile: React.FC<SymbolTileProps> = ({
  symbolTileData,
  hideCategoryColor = false,
}: SymbolTileProps): JSX.Element => {
  const {
    buttonCategoryColors,
    buttonDefaultFontSize,
    showButtonImageLabels,
    showButtonCategoryColors,
    showButtonTextLabels,
  } = useAACPreferencesStore();

  const doImage: boolean =
    showButtonImageLabels && symbolTileData.imageLabel !== undefined;

  let textToRender: string | undefined;
  if (symbolTileData.textLabel && symbolTileData.textLabel.length > 0)
    textToRender = symbolTileData.textLabel;
  else textToRender = symbolTileData.vocalization;
  if (doImage && !showButtonTextLabels) textToRender = undefined;

  const bgColor =
    showButtonCategoryColors && !hideCategoryColor
      ? buttonCategoryColors.get(symbolTileData.category) ?? "#ffffff"
      : "#ffffff";

  return (
    <View
      style={[
        styles.container,
        !doImage && styles.withoutImage,
        { backgroundColor: bgColor },
      ]}
    >
      {doImage && (
        <View style={styles.imageContainer}>
          <SymbolTileImage
            image={symbolTileData.imageLabel!}
            style={styles.image}
            contentFit="cover"
          />
        </View>
      )}

      {textToRender && (
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.text,
              {
                fontSize: Number(buttonDefaultFontSize),
                color: getContrastYIQ(bgColor),
              },
            ]}
            numberOfLines={doImage ? 1 : 3}
            selectable={false}
          >
            {textToRender}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    paddingHorizontal: 6,
    paddingBottom: 4,
  },
  withoutImage: {
    justifyContent: "center",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    // fixes for WEB where dragging the image prevented button reordering:
    userSelect: "none",
    pointerEvents: "none",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
  },
});

export default SymbolTile;
