import React, { useMemo, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAACSymbolTilesStore } from "../contexts/aac-symbol-tiles-provider";
import SymbolTile from "./symbol-tile";

interface HiddenButtonsListProps {}

const NO_SELECTION = "no_selection";

const HiddenButtonsList: React.FC<HiddenButtonsListProps> = ({}) => {
  const {
    allTabs,
    allSymbolTiles,
    tabToSymbolTilesMap,
    addSymbolTileToTab,
    deleteSymbolTile,
  } = useAACSymbolTilesStore();

  // save the states of the dropdown menus for selection the tab individually for each button
  const [pickerSelections, setPickerSelections] = useState<
    Record<string, string>
  >({});
  const updatePicker = (itemKey: string, pickerKey: string) => {
    setPickerSelections((prev) => ({
      ...prev,
      [itemKey]: pickerKey,
    }));
  };

  // collect all symbol tiles that aren't in any of the tabs
  // (these are considered the "hidden buttons")
  const hiddenButtons = useMemo<string[]>(() => {
    const keysToExclude: string[] = Object.values(tabToSymbolTilesMap).flat();
    const excludedSet: Set<string> = new Set(keysToExclude);
    const allKeys: string[] = Object.keys(allSymbolTiles);
    const filteredKeys: string[] = allKeys.filter(
      (key) => !excludedSet.has(key)
    );
    return filteredKeys;
  }, [allSymbolTiles, tabToSymbolTilesMap]);

  // handlers for restoring or permanently deleting each hidden symbol tile
  const handleRestore = (tileKey: string) => {
    const tabKey = pickerSelections[tileKey];
    if (!tabKey || tabKey === NO_SELECTION) return;
    addSymbolTileToTab(tabKey, tileKey);
  };
  const handleDelete = (tileKey: string) => {
    deleteSymbolTile(tileKey);
  };

  return (
    <View>
      {Object.entries(hiddenButtons).map(([_, key]) => {
        const selectedPickerKey = pickerSelections[key] ?? NO_SELECTION;
        return (
          <View style={styles.entry}>
            <View style={styles.preview}>
              <SymbolTile symbolTileData={allSymbolTiles[key]} />
            </View>
            <Picker
              selectedValue={selectedPickerKey}
              onValueChange={(pickerKey) => {
                updatePicker(key, pickerKey);
              }}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item
                label="Select a tab..."
                value={NO_SELECTION}
                enabled={false}
              />
              {Object.values(allTabs).map((tab) => (
                <Picker.Item label={tab.name} value={tab.key} />
              ))}
            </Picker>
            <TouchableOpacity
              style={styles.restore}
              onPress={() => {
                handleRestore(key);
              }}
            >
              <Text>Restore</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => {
                handleDelete(key);
              }}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {},
  pickerItem: {
    color: "black",
  },
  entry: {
    backgroundColor: "yellow",
    flexDirection: "row",
  },
  preview: {
    width: 70,
    height: 70,
  },
  restore: {
    backgroundColor: "#7ab0f7ff",
    borderRadius: 15,
    padding: 10,
    color: "white",
  },
  delete: {
    backgroundColor: "red",
    borderRadius: 15,
    padding: 10,
    color: "white",
  },
});

export default HiddenButtonsList;
