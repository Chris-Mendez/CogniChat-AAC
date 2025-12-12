import React, { JSX } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { SymbolTileData } from "../types/symbol-tile-data";
import { useAACPreferencesStore } from "../contexts/aac-preferences-provider";

/**
 * @interface SymbolTileProps
 *
 * @property {SymbolTileData} symbolTileData - Symbol data
 */
interface SymbolTileProps {
  symbolTileData: SymbolTileData;
}

/**
 * A component for rendering a symbol tile.
 *
 * @param {SymbolTileProps} props - {@link SymbolTileProps}
 * @returns {JSX.Element} A React Native component.
 */
export const SymbolTile: React.FC<SymbolTileProps> = ({
  symbolTileData,
}: SymbolTileProps): JSX.Element => {
  const { buttonCategoryColors, buttonDefaultFontSize } =
    useAACPreferencesStore();

  // First, prepare the visuals for the image label and text label,
  // including the cases when there's both or neither.
  const imageLabelComponent = (
    <Image source={symbolTileData.labelling.imgSrc} style={styles.imageLabel} />
  );
  const textLabelComponent = (
    <Text
      style={[
        styles.textLabel,
        {
          fontSize: Number(buttonDefaultFontSize),
        },
      ]}
      numberOfLines={1}
    >
      {symbolTileData.labelling.text}
    </Text>
  );
  const bothLabelComponent = (
    <>
      <View style={{ height: "80%", width: "80%" }}>{imageLabelComponent}</View>
      {textLabelComponent}
    </>
  );
  const neitherLabelComponent = <Text>Error</Text>;

  // Then, determine which labels should be shown based on the data
  // of the symbol tile.
  let hasImageLabel = symbolTileData.labelling.imgSrc != undefined;
  let hasTextLabel = symbolTileData.labelling.text != undefined;
  let showImageLabel = hasImageLabel && true;
  let showTextLabel = hasTextLabel && true;
  let content;
  if (showImageLabel && showTextLabel) {
    content = bothLabelComponent;
  } else if (showImageLabel) {
    content = imageLabelComponent;
  } else if (showTextLabel) {
    content = textLabelComponent;
  } else {
    content = neitherLabelComponent;
  }

  // Finally, render everything.
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: buttonCategoryColors.get(symbolTileData.category),
        },
      ]}
    >
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  imageLabel: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  textLabel: {
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default SymbolTile;
