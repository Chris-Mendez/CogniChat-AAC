import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAACSymbolTilesStore } from "../contexts/aac-symbol-tiles-provider";
import { addButton } from "@/api/buttons";
import Seperator from "./seperator";
import { useAACPreferencesStore } from "../contexts/aac-preferences-provider";

const DEFAULT_COLORS = [
  "#4a90e2",
  "#32a852",
  "#e29d4a",
  "#d34a4a",
  "#9c2b8dff",
];

const SettingsPage = () => {
  const { buttonCategoryColors } = useAACPreferencesStore();
  const { tabTiles, setTabTiles } = useAACSymbolTilesStore();

  const [vocalizationText, setVocalizationText] = useState("");
  const [tabName, setTabName] = useState("");
  const [partsOfSpeech, setPartsOfSpeech] = useState("");
  const [isDeleted] = useState(false);

  const handleAddSymbol = async () => {
    if (!vocalizationText.trim() || !tabName.trim() || !partsOfSpeech.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const newButton = {
      vocalization_text: vocalizationText.trim(),
      tab_name: tabName.trim(),
      parts_of_speech: partsOfSpeech.trim(),
      is_deleted: isDeleted,
      font_size: 16,
    };

    try {
      const addedButton = await addButton(newButton);
      console.log("Button added:", addedButton);

      setTabTiles([...tabTiles, addedButton[0]]);

      setVocalizationText("");
      setTabName("");
      setPartsOfSpeech("");
    } catch (error) {
      console.error("Error adding button:", error);
      alert("Failed to add button.");
    }
  };

  return (
    <View style={style.container}>
      <Seperator />
      <View style={style.formBox}>
        <Text>Vocalization Text *</Text>
        <TextInput
          value={vocalizationText}
          onChangeText={setVocalizationText}
          placeholder="Enter vocalization text"
          placeholderTextColor="black"
          style={style.input}
        />

        <Text>Tab Name *</Text>
        <TextInput
          value={tabName}
          onChangeText={setTabName}
          placeholder="Enter tab name"
          placeholderTextColor="black"
          style={style.input}
        />

        <Text>Parts of Speech *</Text>
        <TextInput
          value={partsOfSpeech}
          onChangeText={setPartsOfSpeech}
          placeholder="Enter part of speech"
          placeholderTextColor="black"
          style={style.input}
        />
        <TouchableOpacity
          style={[
            style.addButton,
            { backgroundColor: buttonCategoryColors.get(partsOfSpeech) },
          ]}
          onPress={handleAddSymbol}
          disabled={
            !vocalizationText.trim() || !tabName.trim() || !partsOfSpeech.trim()
          }
        >
          <Text style={style.addButtonText}>Add Symbol Tile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#acaefaff",
  },
  colorPalette: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20, // Makes the buttons round
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedColor: {
    borderColor: "black", // Highlight the selected color
    borderWidth: 4,
  },
  addButton: {
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  formBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 300,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default SettingsPage;
