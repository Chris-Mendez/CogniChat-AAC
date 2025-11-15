import { FontAwesome } from "@expo/vector-icons";
import React, { JSX } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SymbolTileData } from "../types/symbol-tile-data";
import SymbolTile from "./symbol-tile";

/**
 * @interface SentenceComposerBarProps
 *
 * @property {SymbolTileData[]} sentence - An array of the symbol tiles
 * that make up the currently composed sentence.
 * @property {function} updateSentence - Callback for when the
 * sentence is modified and should be re-rendered.
 */
interface SentenceComposerBarProps {
  sentence: SymbolTileData[];
  updateSentence: React.Dispatch<React.SetStateAction<SymbolTileData[]>>;
}

/**
 * A component for rendering the sentence composer bar, which
 * consists of a variable length array of symbol tiles, a delete button,
 * and clear all button.
 *
 * @param {SymbolTileGridProps} props {@link SentenceComposerBarProps}
 * @returns {JSX.Element} A React Native component.
 */
export const SentenceComposerBar: React.FC<SentenceComposerBarProps> = ({
  sentence,
  updateSentence,
}: SentenceComposerBarProps): JSX.Element => {
  const renderSymbol = ({ item }: any) => (
    <View style={[styles.symbol]}>
      <SymbolTile symbolTileData={item} />
    </View>
  );

  const handlePopSymbol = () => {
    updateSentence((p) => p.slice(0, -1));
  };

  const handleClearAllSymbols = () => {
    updateSentence((p) => []);
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          horizontal={true}
          data={sentence}
          renderItem={renderSymbol}
          contentContainerStyle={styles.listContent}
        ></FlatList>
      </View>
      <Pressable style={styles.popWordButton} onPress={handlePopSymbol}>
        <FontAwesome name="arrow-left" size={40} color="black" />
      </Pressable>
      <Pressable style={styles.popWordButton} onPress={handleClearAllSymbols}>
        <FontAwesome name="trash" size={40} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0,
    height: "100%",
    paddingVertical: 5,
  },
  listContent: {
    alignItems: "center",
  },
  symbol: {
    width: 100,
    height: 100,
  },
  popWordButton: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
  },
});

export default SentenceComposerBar;
