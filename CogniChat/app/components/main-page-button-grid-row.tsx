import React, { JSX, useState } from "react";
import { StyleSheet, Switch, View, Text } from "react-native";
import { useAACSymbolTilesStore } from "../contexts/aac-symbol-tiles-provider";
import EditableDNDGrid from "./editable-dnd-grid";
import { SymbolTileData } from "../types/symbol-tile-data";
import SymbolTile from "./symbol-tile";

export const MainPageButtonGridRow = () => {
  const { tabTiles, setTabTiles, setSentence } = useAACSymbolTilesStore();
  const [editMode, setEditMode] = useState<boolean>(false);

  const doRenderItem = (tile: SymbolTileData): JSX.Element => {
    return <SymbolTile symbolTileData={tile} />;
  };

  const doDeleteItem = (key: string) => {
    const copy = [...tabTiles];
    setTabTiles(copy.filter((item) => item.key !== key));
  };

  const doSwapItems = (indexFrom: number, indexTo: number) => {
    let copy = [...tabTiles];
    let temp = copy[indexFrom];
    copy[indexFrom] = copy[indexTo];
    copy[indexTo] = temp;
    setTabTiles(copy);
  };

  const doPressItem = (tile: SymbolTileData) => {
    setSentence((p) => [...p, tile]);
  };

  return (
    <>
      <View style={styles.gridControlsContainer}>
        <Switch
          value={editMode}
          onValueChange={(v) => {
            setEditMode(v);
          }}
        />
        <Text>Edit mode</Text>
      </View>
      <EditableDNDGrid<SymbolTileData>
        items={tabTiles}
        renderItem={doRenderItem}
        onDeleteItem={doDeleteItem}
        onSwapItems={doSwapItems}
        onItemPress={doPressItem}
        itemWidth={120}
        itemHeight={120}
        isEditMode={editMode}
      />
    </>
  );
};

const styles = StyleSheet.create({
  gridControlsContainer: {
    flexDirection: "row",
    backgroundColor: "#AF8EC9",
    paddingVertical: 5,
  },
});

export default MainPageButtonGridRow;
