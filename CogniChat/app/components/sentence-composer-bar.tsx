import React, { JSX } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SymbolTileData } from "../types/symbol-tile-data";
import SymbolTile from "./symbol-tile";
import { Instanced } from "../types/instanced";
import RightmostScrollView from "./rightmost-scroll-view";

/**
 * @interface SentenceComposerBarProps
 *
 * @property {SymbolTileData[]} sentence - An array of the symbol tiles
 * that make up the currently composed sentence.
 */
interface SentenceComposerBarProps {
  sentence: Instanced<SymbolTileData>[];
  onPress?: (instanceKey: string) => void;
}

/**
 * A component for rendering the sentence composer bar, which
 * consists of a variable length array of symbol tiles.
 *
 * @param {SentenceComposerBarProps} props {@link SentenceComposerBarProps}
 * @returns {JSX.Element} A React Native component.
 */
export const SentenceComposerBar: React.FC<SentenceComposerBarProps> = ({
  sentence,
  onPress,
}: SentenceComposerBarProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <RightmostScrollView style={styles.listContainer}>
        {sentence.map((item) => (
          <Pressable
            onPress={() => {
              onPress?.(item.instanceKey);
            }}
            style={styles.symbol}
            key={item.instanceKey}
          >
            <SymbolTile symbolTileData={item.value} hideCategoryColor={true} />
          </Pressable>
        ))}
      </RightmostScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "purple",
    flex: 1,
    flexDirection: "row",
    padding: 5,
  },
  listContainer: {
    flex: 1,
    height: "100%",
  },
  symbol: {
    aspectRatio: 1,
    alignSelf: "stretch",
  },
});

export default SentenceComposerBar;
