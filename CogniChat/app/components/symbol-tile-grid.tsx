import React, { JSX } from "react";
import { StyleSheet, ScrollView, Pressable } from "react-native";
import { SymbolTileData } from "../types/symbol-tile-data";
import SymbolTile from "./symbol-tile";

/**
 * @interface SymbolTileGridProps
 *
 * @property {SymbolTileData[]} tiles - An array of the symbol tiles
 * that make up the symbol tile grid.
 * @property {number} symbolSize - How large the symbol tiles should be, in pixels.
 * @property {function} updateSentence - Callback for when the
 * sentence is modified and should be re-rendered.
 */
interface SymbolTileGridProps {
  tiles: SymbolTileData[];
  symbolSize: number;
  updateSentence: React.Dispatch<React.SetStateAction<SymbolTileData[]>>;
}

/**
 * A component for rendering a grid of symbol tiles.
 *
 * @param {SymbolTileGridProps} props {@link SymbolTileGridProps}
 * @returns {JSX.Element} A React Native component.
 */
const SymbolTileGrid: React.FC<SymbolTileGridProps> = ({
  tiles,
  symbolSize,
  updateSentence,
}: SymbolTileGridProps): JSX.Element => {
  const handleAddSymbol = (tile: SymbolTileData) => {
    updateSentence((p) => [...p, tile]);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="always"
    >
      {tiles.map((tile) => (
        <Pressable
          onPress={() => {
            handleAddSymbol(tile);
          }}
          style={{
            width: symbolSize,
            height: symbolSize,
          }}
        >
          <SymbolTile symbolTileData={tile} />
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "orange",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default SymbolTileGrid;
