import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useAACSymbolTilesStore } from "../contexts/aac-symbol-tiles-provider";
import SymbolTileGrid from "./symbol-tile-grid";

export const MainPageButtonGridRow = () => {
  const { tabTiles, setSentence } = useAACSymbolTilesStore();

  return (
    <ScrollView style={styles.container}>
      <SymbolTileGrid
        tiles={tabTiles}
        symbolSize={300}
        updateSentence={setSentence}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "white",
    padding: 10,
   },
});

export default MainPageButtonGridRow;
