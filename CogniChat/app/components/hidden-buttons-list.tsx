import React, { useMemo, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAACSymbolTilesStore } from "../contexts/aac-symbol-tiles-provider";
import SymbolTile from "./symbol-tile";
import { PICKER_NO_SELECTION } from "../constants/picker-no-selection";
import { useAACUserImagesStore } from "../contexts/aac-user-images-provider";

interface HiddenButtonsListProps {}

const HiddenButtonsList: React.FC<HiddenButtonsListProps> = ({}) => {
  const {
    allTabs,
    allSymbolTiles,
    tabToSymbolTilesMap,
    addSymbolTileToTab,
    deleteSymbolTile,
  } = useAACSymbolTilesStore();
  const { unlinkImage } = useAACUserImagesStore();

  // save the states of the tab selections individually for each hidden button
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
  // (these are the "hidden buttons")
  const hiddenButtons = useMemo<string[]>(() => {
    const keysToExclude: string[] = Object.values(tabToSymbolTilesMap).flat();
    const excludedSet: Set<string> = new Set(keysToExclude);
    const allKeys: string[] = Object.keys(allSymbolTiles);
    const filteredKeys: string[] = allKeys.filter(
      (key) => !excludedSet.has(key)
    );
    return filteredKeys;
  }, [allSymbolTiles, tabToSymbolTilesMap]);

  // handlers for restoring or permanently deleting each hidden button
  const handleRestore = (tileKey: string) => {
    const tabKey = pickerSelections[tileKey];
    if (!tabKey || tabKey === PICKER_NO_SELECTION) return;
    addSymbolTileToTab(tabKey, tileKey);
  };
  const handleDelete = (tileKey: string) => {
    const symbolTile = allSymbolTiles[tileKey];
    if (symbolTile.imageLabel && symbolTile.imageLabel.kind === "stored") {
      unlinkImage(symbolTile.imageLabel.hash);
    }
    deleteSymbolTile(tileKey);
  };

  return (
    <View>
      {Object.entries(hiddenButtons).map(([_, key]) => {
        const selectedPickerKey = pickerSelections[key] ?? PICKER_NO_SELECTION;
        return (
          <View style={styles.entry} key={key}>
            <View style={styles.preview}>
              <SymbolTile
                symbolTileData={allSymbolTiles[key]}
                hideCategoryColor={true}
              />
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
                value={PICKER_NO_SELECTION}
                enabled={false}
              />
              {Object.values(allTabs).map((tab) => (
                <Picker.Item label={tab.name} value={tab.key} />
              ))}
            </Picker>
            <TouchableOpacity
              style={[styles.button, styles.restore]}
              onPress={() => {
                handleRestore(key);
              }}
            >
              <Text>Restore</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.delete]}
              onPress={() => {
                handleDelete(key);
              }}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        );
      })}
      {hiddenButtons.length === 0 && (
        <Text>You do not any removed buttons.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 44,
    minWidth: 160,
  },
  pickerItem: {
    color: "black",
  },
  entry: {
    flexDirection: "row",
  },
  preview: {
    width: 90,
    height: 90,
  },
  restore: {
    backgroundColor: "#7ab0f7ff",
  },
  delete: {
    backgroundColor: "red",
  },
  button: {
    borderRadius: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HiddenButtonsList;
