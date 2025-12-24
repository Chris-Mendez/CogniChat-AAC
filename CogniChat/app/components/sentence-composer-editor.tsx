import React, { JSX, useState } from "react";
import { Pressable, StyleSheet, View, TextInput, Text } from "react-native";
import { SymbolTileData } from "../types/symbol-tile-data";
import SymbolTile from "./symbol-tile";
import { Instanced } from "../types/instanced";
import createUniqueKey from "../utils/create-unique-key";
import { SymbolTileCategoryKey } from "../types/symbol-tile-categories";
import RightmostScrollView from "./rightmost-scroll-view";

/**
 * @interface SentenceComposerEditorProps
 *
 * @property {SymbolTileData[]} sentence - An array of the symbol tiles
 * that make up the currently composed sentence.
 * @property {function} updateSentence - Callback for when the
 * sentence is modified and should be re-rendered.
 * @property {function} onClose - Callback for when the editor is requested
 * to be closed by the user.
 */
interface SentenceComposerEditorProps {
  sentence: Instanced<SymbolTileData>[];
  updateSentence: React.Dispatch<
    React.SetStateAction<Instanced<SymbolTileData>[]>
  >;
  onClose: () => void;
}

/**
 * A component for enabling the user to manually edit the composer bar
 * through a pop-up modal with a text input.
 *
 * @param {SentenceComposerEditorProps} props {@link SentenceComposerEditorProps}
 * @returns {JSX.Element} A React Native component.
 */
export const SentenceComposerEditor: React.FC<SentenceComposerEditorProps> = ({
  sentence,
  updateSentence,
  onClose,
}: SentenceComposerEditorProps): JSX.Element => {
  const [text, setText] = useState("");

  const handleCompleteWord = (word: string) => {
    const tile: SymbolTileData = {
      vocalization: word,
      labelling: {
        text: word,
        imgSrc: undefined,
      },
      category: SymbolTileCategoryKey.other,
      key: createUniqueKey(),
    };
    updateSentence((p) => [
      ...p,
      {
        instanceKey: createUniqueKey(),
        value: tile,
      },
    ]);
    setText("");
  };

  const handlePopSymbol = (instanceKey: string) => {
    updateSentence((p) =>
      p.filter((tile, _) => tile.instanceKey !== instanceKey)
    );
  };

  const handleUndo = () => {
    updateSentence((prev) => {
      if (prev.length === 0) return prev;
      const lastTile = prev[prev.length - 1];
      setText(lastTile.value.vocalization + " ");
      return prev.slice(0, -1);
    });
  };

  const handleChangeText = (value: string) => {
    setText(value);
    if (value.endsWith(" ") && text.trim().length > 0) {
      handleCompleteWord(text.trim());
    }
  };

  const handleKeyPress = ({ nativeEvent }: any) => {
    if (nativeEvent.key === "Backspace" && text.length === 0) {
      handleUndo();
    }
  };

  const handleSubmit = () => {
    if (text.trim().length > 0) {
      handleCompleteWord(text.trim());
    }
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <RightmostScrollView>
          {sentence.map((item) => (
            <Pressable
              onPress={() => handlePopSymbol(item.instanceKey)}
              style={styles.symbol}
              key={item.instanceKey}
            >
              <SymbolTile
                symbolTileData={item.value}
                hideCategoryColor={true}
              />
            </Pressable>
          ))}
        </RightmostScrollView>
      </View>
      <Text>Tap on a tile to remove it. Type below to add your own words.</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleChangeText}
        onKeyPress={handleKeyPress}
        onSubmitEditing={handleSubmit}
        value={text}
        placeholder="Type here..."
        keyboardType="default"
      />
      <Pressable onPress={onClose} style={styles.close}>
        <Text>Done</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
  },
  listContainer: {
    borderRadius: 10,
    height: 100,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  close: {
    borderRadius: 8,
    backgroundColor: "#6c93efff",
    padding: 8,
    color: "white",
  },
  symbol: {
    aspectRatio: 1,
    alignSelf: "stretch",
  },
});

export default SentenceComposerEditor;
