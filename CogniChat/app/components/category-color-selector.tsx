import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  SymbolTileCategoryKey,
  SymbolTileCategoryProperties,
} from "../types/symbol-tile-categories";
import { getContrastYIQ } from "../utils/color-helper";
import { enumValuesOf } from "../utils/enum-iterator";

/**
 * @interface CategoryColorSelectorProps
 *
 * @property {Map<SymbolTileCategoryKey, string>} selectedColors - A
 * map of colors the user currently has selected.
 * @property {function} setSelectedClors - Callback to update selectedColors.
 * @property {string[]} availableColors - An array of hex colors available
 * that the user can select from.
 */
interface CategoryColorSelectorProps {
  selectedColors: Map<SymbolTileCategoryKey, string>;
  setSelectedColors: (n: Map<SymbolTileCategoryKey, string>) => void;
  availableColors: string[];
}

const CategoryColorSelector: React.FC<CategoryColorSelectorProps> = ({
  selectedColors,
  setSelectedColors,
  availableColors,
}) => {
  const isColorTaken = (
    color: string,
    currentKey: SymbolTileCategoryKey
  ): boolean => {
    for (const [key, value] of selectedColors.entries()) {
      if (value === color && key !== currentKey) {
        return true;
      }
    }
    return false;
  };

  const handlePress = (
    key: SymbolTileCategoryKey,
    color: string,
    isTaken: boolean,
    isSelected: boolean
  ) => {
    if (isTaken) return;
    const newMap = new Map(selectedColors);
    if (!isSelected) {
      newMap.set(key, color);
    }
    setSelectedColors(newMap);
  };

  return (
    <View style={styles.container}>
      {enumValuesOf(SymbolTileCategoryKey).map((enumKey) => {
        return (
          <View key={enumKey} style={styles.row}>
            <Text style={styles.label}>
              {SymbolTileCategoryProperties[enumKey].plural}
            </Text>

            <View style={styles.colorsContainer}>
              {availableColors.map((color) => {
                const selectedColor = selectedColors.get(enumKey);
                const isSelected = selectedColor === color;
                const isTaken = isColorTaken(color, enumKey);

                return (
                  <TouchableOpacity
                    key={color}
                    activeOpacity={0.7}
                    disabled={isTaken}
                    onPress={() =>
                      handlePress(enumKey, color, isTaken, isSelected)
                    }
                    hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                    style={[
                      styles.colorBox,
                      { backgroundColor: color },
                      isTaken && styles.colorBoxTaken,
                      isSelected && styles.colorBoxSelected,
                    ]}
                  >
                    {isSelected && (
                      <FontAwesome
                        name="check"
                        size={12}
                        color={getContrastYIQ(color)}
                      />
                    )}
                    {isTaken && (
                      <FontAwesome name="close" size={12} color="#888" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  row: {
    marginBottom: 22,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  colorsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    gap: 10,
    marginTop: 10,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  colorBoxSelected: {
    transform: [{ scale: 1.2 }],
    borderWidth: 1,
    borderColor: "#333",
    zIndex: 10,
  },
  colorBoxTaken: {
    opacity: 0.8,
    backgroundColor: "#ddd",
  },
});

export default CategoryColorSelector;
