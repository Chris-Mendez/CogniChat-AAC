import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUserPreferences } from "../contexts/__mocks__/legacy-user-preferences";
import { useAACPreferencesStore } from "../contexts/aac-preferences-provider";
import { useAACSymbolTilesStore } from "../contexts/aac-symbol-tiles-provider";
import { SymbolTileData } from "../types/symbol-tile-data";
import { addButton } from "@/api/buttons";
const Seperator = () => <View style={style.separator} />;

const DEFAULT_COLORS = [
  "#4a90e2",
  "#32a852",
  "#e29d4a",
  "#d34a4a",
  "#9c2b8dff",
];

const newsetting = () => {
  const [text, setText] = useState("");

  const { preferences, setPreferences } = useUserPreferences();
  const setGridSize = function (n: number) {
    setPreferences((p) => ({ ...p, gridSize: n }));
  };

  const setButtonColor = function (color: string) {
    setPreferences((p) => ({ ...p, buttonColor: color }));
  };

  const { tabTiles, setTabTiles } = useAACSymbolTilesStore();
  /*
  // Adding the new tile
  const handleAddSymbol = () => {
    if (text.trim() === "") return;

    const newTile: SymbolTileData = {
      // id: Math.random().toString(36).substring(7),
      textLabelText: text.trim(),
      category: "other",
      showTextLabel: true,
      imageLabelSource: undefined,
      showImageLabel: false,
      textLabelFontSize: 16,
      textLabelFontFamily: "System",
      vocalizationText: text.trim(),
    };

    setTabTiles([...tabTiles, newTile]);

    setText("");
  };
  */

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

  let gridSizeHintText = "";
  if (preferences.gridSize < 75) {
    gridSizeHintText = "Small";
  } else if (preferences.gridSize < 115) {
    gridSizeHintText = "Medium";
  } else {
    gridSizeHintText = "Large";
  }

  return (
    <View style={style.container}>
      <View>
        <Text>What size do you want the boxes?</Text>

        <Text>{gridSizeHintText}</Text>

        <Slider
          style={{ width: 300, height: 40 }}
          minimumValue={25}
          maximumValue={170}
          minimumTrackTintColor="#71d38bff"
          maximumTrackTintColor="#000000"
          thumbTintColor="#32a852"
          value={preferences.gridSize}
          onValueChange={setGridSize}
          step={1}
        />
      </View>

      <Seperator />
      <View style={{ alignItems: "center" }}>
        <Text>Choose a color for the buttons:</Text>
        <View style={style.colorPalette}>
          {DEFAULT_COLORS.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                style.colorOption,
                { backgroundColor: color },
                // Add a visual indicator for the currently selected color
                preferences.buttonColor === color && style.selectedColor,
              ]}
              onPress={() => setButtonColor(color)}
            />
          ))}
        </View>
      </View>

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
            { backgroundColor: preferences.buttonColor },
          ]}
          onPress={handleAddSymbol}
          //disabled={text.trim() === ""}
          disabled={!vocalizationText.trim() || !tabName.trim() || !partsOfSpeech.trim()}
        >
          <Text style={style.addButtonText}>Add Symbol Tile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  /*
  <Text>What word or phrase to add</Text>
        <TextInput
          onChangeText={(newWord) => setText(newWord)}
          value={text}
          placeholder="Enter the button to add"
          style={{ borderWidth: 1, padding: 5, marginTop: 5, width: 300 }}
        />
  */
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#acaefaff",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    color: "white",
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

export default newsetting;
