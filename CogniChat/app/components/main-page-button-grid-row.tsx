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
import { Ionicons } from "@expo/vector-icons";
import createUniqueKey from "../utils/create-unique-key";
import CenterModal from "./center-modal";
import TextPrompt from "./text-prompt";

export const MainPageButtonGridRow = () => {
  const {
    activeTabSymbolTiles,
    setSentence,
    removeSymbolTileFromTab,
    activeTabId,
    allTabs,
    setActiveTabId,
    setActiveTabOrder,
    addTab,
  } = useAACSymbolTilesStore();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [numColumns, setNumColumns] = useState<number>(1);
  const [createTabVisible, setCreateTabVisible] = useState<boolean>(false);

  const doRenderItem = (tile: SymbolTileData): JSX.Element => {
    return <SymbolTile symbolTileData={tile} />;
  };

  const doDeleteItem = (key: string) => {
    removeSymbolTileFromTab(activeTabId, key);
  };

  const doSwapItems = (fromIndex: number, toIndex: number) => {
    setActiveTabOrder((prev) => {
      const next = [...prev];
      const temp = next[fromIndex];
      next[fromIndex] = next[toIndex];
      next[toIndex] = temp;
      return next;
    });
  };

  const doPressItem = (tile: SymbolTileData) => {
    setSentence((p) => [
      ...p,
      {
        instanceKey: createUniqueKey(),
        value: tile,
      },
    ]);
  };

  const doFlipGrid = () => {
    setActiveTabOrder((prev) => {
      if (prev.length < numColumns) {
        return prev;
      }
      const result: string[] = [];
      for (let i = 0; i < prev.length; i += numColumns) {
        const row = prev.slice(i, i + numColumns);
        result.push(...row.reverse());
      }
      return result;
    });
  };

  const handleCreateTab = (name: string) => {
    addTab({
      name: name,
      key: createUniqueKey(),
    });
    setCreateTabVisible(false);
  };

  return (
    <>
      <CenterModal
        visible={createTabVisible}
        onClose={() => {
          setCreateTabVisible(false);
        }}
      >
        <TextPrompt
          promptMessage={"Enter the name of the new tab"}
          placeholderText={"Type here..."}
          onSubmit={handleCreateTab}
          onCancel={() => {
            setCreateTabVisible(false);
          }}
        />
      </CenterModal>
      <View style={styles.tabsAndControlsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScroll}
          style={styles.tabsContainer}
        >
          {editMode && (
            <TouchableOpacity
              key={"create_new_tab"}
              style={styles.tab}
              onPress={() => {
                setCreateTabVisible(true);
              }}
            >
              <Text style={styles.tabText}>Create Tab</Text>
            </TouchableOpacity>
          )}
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
        <View style={styles.staticControlsContainer}>
          <TouchableOpacity style={styles.flip} onPress={doFlipGrid}>
            <Ionicons name="swap-horizontal" size={40} color="black" />
            <Text>Flip</Text>
          </TouchableOpacity>
          <View style={styles.edit}>
            <Switch value={editMode} onValueChange={setEditMode} />
            <Text>Edit mode</Text>
          </View>
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
        onGridLayout={setNumColumns}
      />
    </>
  );
};

const styles = StyleSheet.create({
  tabsAndControlsContainer: {
    flexDirection: "row",
    backgroundColor: "#AF8EC9",
  },
  tabScroll: {
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
  },
  staticControlsContainer: {
    backgroundColor: "gray",
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  tabsContainer: {
    backgroundColor: "yellow",
    flex: 1,
  },
  flip: {
    backgroundColor: "orange",
    padding: 4,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
});

export default MainPageButtonGridRow;
