import React from "react";
import { StyleSheet, View } from "react-native";
import { useAACSymbolTilesStore } from "../contexts/aac-symbol-tiles-provider";
import SentenceComposerBar from "./sentence-composer-bar";

export const MainPageSentenceComposerRow = () => {
  const { sentence, setSentence } = useAACSymbolTilesStore();

  return (
    <View style={styles.container}>
      <SentenceComposerBar sentence={sentence} updateSentence={setSentence} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7E2F8D",
    height: 120,
    padding: 10,
  },
});

export default MainPageSentenceComposerRow;
