import React, { JSX } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SymbolTileData } from "../types/symbol-tile-data";
import SymbolTile from "./symbol-tile";
import uuid from "react-native-uuid";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Speech from "expo-speech";

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
 * clear all button, speak button (using text-to-speech), and a manual
 * phrase input box when the composer bar is pressed on.
 *
 * @param {SymbolTileGridProps} props {@link SentenceComposerBarProps}
 * @returns {JSX.Element} A React Native component.
 */
export const SentenceComposerBar: React.FC<SentenceComposerBarProps> = ({
  sentence,
  updateSentence,
}: SentenceComposerBarProps): JSX.Element => {
  const handlePopSymbol = (index: number) => {
    updateSentence((p) => p.filter((_, i) => i !== index));
  };

  const handleClearAllSymbols = () => {
    updateSentence((p) => []);
  };

  const handleSpeak = () => {
    if (sentence.length === 0) return;
    const formedSentence = sentence.map((tile) => tile.vocalization).join(" ");
    Speech.speak(formedSentence);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.listContainer} horizontal={true}>
        {sentence.map((tile, index) => (
          <Pressable
            style={[styles.symbol]}
            key={uuid.v4()}
            onPress={() => handlePopSymbol(index)}
          >
            <SymbolTile symbolTileData={tile} />
          </Pressable>
        ))}
      </ScrollView>
      <Pressable style={styles.popWordButton} onPress={handleSpeak}>
        <Ionicons name="volume-high" size={40} color="black" />
      </Pressable>
      <Pressable style={styles.popWordButton} onPress={handleClearAllSymbols}>
        <Ionicons name="trash" size={40} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
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
    width: 70,
    height: 70,
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
