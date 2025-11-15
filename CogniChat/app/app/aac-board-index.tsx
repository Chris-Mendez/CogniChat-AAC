import React from "react";
import { StyleSheet, View } from "react-native";
import MainPageButtonGridRow from "./components/main-page-button-grid-row";
import MainPageHeaderRow from "./components/main-page-header-row";
import MainPageSentenceComposerRow from "./components/main-page-sentence-composer-row";
import MainPageTabsRow from "./components/main-page-tabs-row";

const AACBoard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MainPageHeaderRow />
      </View>
      <View style={styles.sentenceComposerRow}>
        <MainPageSentenceComposerRow />
      </View>
      <View style={styles.tabsRow}>
        <MainPageTabsRow />
      </View>
      <View style={styles.gridRow}>
        <MainPageButtonGridRow />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    height: 80,
  },
  sentenceComposerRow: {
    height: 100,
  },
  tabsRow: {
    height: 60,
  },
  gridRow: { flex: 1 },
});

export default AACBoard;
