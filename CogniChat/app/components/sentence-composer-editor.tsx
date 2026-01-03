import React, { JSX, useState } from "react";
import { Pressable, StyleSheet, View, TextInput, Text } from "react-native";
import { SymbolTileData } from "../types/symbol-tile-data";
import { Instanced } from "../types/instanced";
import createUniqueKey from "../utils/create-unique-key";
import { SymbolTileCategoryKey } from "../types/symbol-tile-categories";
import SentenceComposerBar from "./sentence-composer-bar";
import SymbolTile from "./symbol-tile";

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
      textLabel: word,
      imageLabel: undefined,
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
      setText(lastTile.value.vocalization);
      return prev.slice(0, -1);
    });
  };

  const handleChangeText = (value: string) => {
    setText(value);
    if (value.endsWith(" ") && text.trim().length > 0) {
      handleCompleteWord(text.trim());
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === "Backspace" && text.length === 0) {
      e.preventDefault?.(); // fix for web race condition
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
      <View style={styles.sentenceComposerBar}>
        <SentenceComposerBar
          sentence={sentence}
          renderSymbol={(item) => {
            return (
              <Pressable
                style={{ flex: 1 }}
                onPress={() => handlePopSymbol(item.instanceKey)}
              >
                <SymbolTile
                  symbolTileData={item.value}
                  hideCategoryColor={true}
                />
              </Pressable>
            );
          }}
        />
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
        autoFocus={true}
      />
      <Pressable onPress={handleSubmit} style={styles.close}>
        <Text>Done</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
  },
  sentenceComposerBar: {
    height: 90,
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
});

export default SentenceComposerEditor;
