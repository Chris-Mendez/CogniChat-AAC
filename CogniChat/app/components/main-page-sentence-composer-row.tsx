import React, { JSX, useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Speech from "expo-speech";
import { useAACPreferencesStore } from "../contexts/aac-preferences-provider";
import CenterModal from "./center-modal";
import SentenceComposerEditor from "./sentence-composer-editor";
import { useAACSymbolTilesStore } from "../contexts/aac-symbol-tiles-provider";
import SentenceComposerBar from "./sentence-composer-bar";

/**
 * @interface MainPageSentenceComposerRowProps
 */
interface MainPageSentenceComposerRowProps {}

/**
 * A component for rendering the sentence composer bar, which
 * consists of a variable length array of symbol tiles, a delete button,
 * clear all button, speak button (using text-to-speech), and a manual
 * phrase input box when the composer bar is pressed on.
 *
 * @param {MainPageSentenceComposerRowProps} props {@link MainPageSentenceComposerRowProps}
 * @returns {JSX.Element} A React Native component.
 */
export const MainPageSentenceComposerRow: React.FC<
  MainPageSentenceComposerRowProps
> = ({}: MainPageSentenceComposerRowProps): JSX.Element => {
  const { sentence, setSentence } = useAACSymbolTilesStore();
  const { ttsVoice } = useAACPreferencesStore();
  const [manualEditModalVisible, setManualEditModalVisible] =
    useState<boolean>(false);

  const handleClearAllSymbols = () => {
    setSentence((_) => []);
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
          updateSentence={setSentence}
          onClose={() => setManualEditModalVisible(false)}
        />
      </CenterModal>
      <View style={styles.container}>
        <Pressable onPress={handleManualEdit} style={{ flex: 1 }}>
          <SentenceComposerBar sentence={sentence} onPress={handleManualEdit} />
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
  popWordButton: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
  },
});

export default MainPageSentenceComposerRow;
