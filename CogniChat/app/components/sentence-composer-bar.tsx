import React, { JSX } from "react";
import { StyleSheet, View } from "react-native";
import { SymbolTileData } from "../types/symbol-tile-data";
import { Instanced } from "../types/instanced";
import RightmostFlatList from "./rightmost-flat-list";
import RightmostScrollView from "./rightmost-scroll-view";

/**
 * @interface SentenceComposerBarProps
 *
 * @property {SymbolTileData[]} sentence - An array of the symbol tiles
 * that make up the currently composed sentence.
 * @property {function} renderSymbol - Callback for handling what
 * should be rendered for each symbol.
 */
interface SentenceComposerBarProps {
  sentence: Instanced<SymbolTileData>[];
  renderSymbol: (symbol: Instanced<SymbolTileData>) => React.ReactNode;
}

/**
 * A component for rendering the sentence composer bar, which
 * consists of a variable length array of symbol tiles.
 *
 * @param {SentenceComposerBarProps} props {@link SentenceComposerBarProps}
 * @returns {JSX.Element} A React Native component.
 */
export const SentenceComposerBar: React.FC<SentenceComposerBarProps> = ({
  sentence,
  renderSymbol,
}: SentenceComposerBarProps): JSX.Element => {
  /*
  // FlatList is completely broken on mobile, and I can't figure
  // out how to fix it...
  // So as an alternative, use the (less efficient) map method
  // below, which effectively works the same anwyways.
  return (
    <RightmostFlatList
      style={styles.container}
      data={sentence}
      keyExtractor={(item) => item.instanceKey}
      renderItem={(item) => (
        <View style={styles.symbol}>{renderSymbol(item.item)}</View>
      )}
    />
  );
  */

  return (
    <RightmostScrollView style={styles.container}>
      {sentence.map((item) => (
        <View style={styles.symbol} key={item.instanceKey}>
          {renderSymbol(item)}
        </View>
      ))}
    </RightmostScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "purple",
    flexDirection: "row",
    padding: 5,
  },
  symbol: {
    aspectRatio: 1,
    alignSelf: "stretch",
  },
});

export default SentenceComposerBar;
