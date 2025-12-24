import React, { JSX, useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { SymbolTileData } from "../types/symbol-tile-data";
import SymbolTile from "./symbol-tile";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Speech from "expo-speech";
import { useAACPreferencesStore } from "../contexts/aac-preferences-provider";
import { Instanced } from "../types/instanced";
import CenterModal from "./center-modal";
import SentenceComposerEditor from "./sentence-composer-editor";
import RightmostScrollView from "./rightmost-scroll-view";

/**
 * @interface SentenceComposerBarProps
 *
 * @property {SymbolTileData[]} sentence - An array of the symbol tiles
 * that make up the currently composed sentence.
 * @property {function} updateSentence - Callback for when the
 * sentence is modified and should be re-rendered.
 */
interface SentenceComposerBarProps {
  sentence: Instanced<SymbolTileData>[];
  updateSentence: React.Dispatch<
    React.SetStateAction<Instanced<SymbolTileData>[]>
  >;
}

/**
 * A component for rendering the sentence composer bar, which
 * consists of a variable length array of symbol tiles, a delete button,
 * clear all button, speak button (using text-to-speech), and a manual
 * phrase input box when the composer bar is pressed on.
 *
 * @param {SentenceComposerBarProps} props {@link SentenceComposerBarProps}
 * @returns {JSX.Element} A React Native component.
 */
export const SentenceComposerBar: React.FC<SentenceComposerBarProps> = ({
  sentence,
  updateSentence,
}: SentenceComposerBarProps): JSX.Element => {
  const { ttsVoice } = useAACPreferencesStore();
  const [manualEditModalVisible, setManualEditModalVisible] =
    useState<boolean>(false);

  const handleClearAllSymbols = () => {
    updateSentence((_) => []);
  };

  const handleSpeak = () => {
    if (sentence.length === 0) return;
    const formedSentence = sentence
      .map((tile) => tile.value.vocalization)
      .join(" ");
    Speech.stop();
    Speech.speak(formedSentence, { voice: ttsVoice });
  };

  const handleManualEdit = () => {
    setManualEditModalVisible(true);
  };

  return (
    <>
      <CenterModal
        visible={manualEditModalVisible}
        onClose={() => setManualEditModalVisible(false)}
      >
        <SentenceComposerEditor
          sentence={sentence}
          updateSentence={updateSentence}
          onClose={() => setManualEditModalVisible(false)}
        />
      </CenterModal>
      <View style={styles.container}>
        <Pressable onPress={handleManualEdit} style={{ flex: 1 }}>
          <RightmostScrollView style={styles.listContainer}>
            {sentence.map((item) => (
              <View style={styles.symbol} key={item.instanceKey}>
                <SymbolTile
                  symbolTileData={item.value}
                  hideCategoryColor={true}
                />
              </View>
            ))}
          </RightmostScrollView>
        </Pressable>
        <Pressable style={styles.popWordButton} onPress={handleSpeak}>
          <Ionicons name="volume-high" size={40} color="black" />
        </Pressable>
        <Pressable style={styles.popWordButton} onPress={handleClearAllSymbols}>
          <Ionicons name="trash" size={40} color="black" />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    height: "100%",
  },
  symbol: {
    aspectRatio: 1,
    alignSelf: "stretch",
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
