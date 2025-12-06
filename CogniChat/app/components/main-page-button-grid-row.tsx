import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useAACSymbolTilesStore } from "../contexts/aac-symbol-tiles-provider";
import EditableDNDGridMock from "./__mocks__/editable-dnd-grid-mock";

export const MainPageButtonGridRow = () => {
  const { tabTiles, setSentence } = useAACSymbolTilesStore();

  return <EditableDNDGridMock />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default MainPageButtonGridRow;
