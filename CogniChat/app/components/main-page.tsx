import React from "react";
import { StyleSheet, View } from "react-native";
import MainPageButtonGridRow from "./main-page-button-grid-row";
import MainPageHeaderRow from "./main-page-header-row";
import MainPageSentenceComposerRow from "./main-page-sentence-composer-row";
import { SafeAreaView } from "react-native-safe-area-context";

const AACBoardPage = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerRow}>
        <MainPageHeaderRow />
      </View>
      <View style={styles.sentenceComposerRow}>
        <MainPageSentenceComposerRow />
      </View>
      <View style={styles.gridRow}>
        <MainPageButtonGridRow />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
  headerRow: {
    height: 80,
  },
  sentenceComposerRow: {
    height: 100,
  },
  gridRow: { flex: 1 },
});

export default AACBoardPage;
