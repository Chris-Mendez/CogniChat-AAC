import React, { JSX, useState } from "react";
import {
  StyleSheet,
  Switch,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAACSymbolTilesStore } from "../contexts/aac-symbol-tiles-provider";
import EditableDNDGrid from "./editable-dnd-grid";
import { SymbolTileData } from "../types/symbol-tile-data";
import SymbolTile from "./symbol-tile";

export const MainPageButtonGridRow = () => {
  const {
    activeTabSymbolTiles,
    setSentence,
    removeSymbolTileFromTab: removeDataFromTab,
    activeTabId,
    swapItemsInActiveTab,
    allTabs,
    setActiveTabId,
  } = useAACSymbolTilesStore();
  const [editMode, setEditMode] = useState<boolean>(false);

  const doRenderItem = (tile: SymbolTileData): JSX.Element => {
    return <SymbolTile symbolTileData={tile} />;
  };

  const doDeleteItem = (key: string) => {
    removeDataFromTab(activeTabId, key);
  };

  const doSwapItems = (indexFrom: number, indexTo: number) => {
    swapItemsInActiveTab(indexFrom, indexTo);
  };

  const doPressItem = (tile: SymbolTileData) => {
    setSentence((p) => [...p, tile]);
  };

  return (
    <>
      <View style={styles.gridControlsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {Object.values(allTabs).map((tab) => {
            const isActive = tab.key === activeTabId;

            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => setActiveTabId(tab.key)}
              >
                <Text
                  style={[styles.tabText, isActive && styles.activeTabText]}
                >
                  {tab.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={styles.edit}>
          <Switch
            value={editMode}
            onValueChange={(v) => {
              setEditMode(v);
            }}
          />
          <Text> Edit mode</Text>
        </View>
      </View>
      <EditableDNDGrid<SymbolTileData>
        items={activeTabSymbolTiles}
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
  scrollContent: {
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: "#4A90E2",
  },
  tabText: {
    color: "#555",
    fontSize: 14,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },
  edit: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    padding: 8,
  },
});

export default MainPageButtonGridRow;
