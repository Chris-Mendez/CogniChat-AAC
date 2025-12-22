import React, { JSX, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import SettingsRow from "./settings-row";
import {
  SymbolTileCategoryKey,
  SymbolTileCategoryProperties,
} from "@/app/types/symbol-tile-categories";
import { useAACSymbolTilesStore } from "@/app/contexts/aac-symbol-tiles-provider";
import createUniqueKey from "@/app/utils/create-unique-key";
import { Picker } from "@react-native-picker/picker";
import { enumValuesOf } from "@/app/utils/enum-iterator";
import { Ionicons } from "@expo/vector-icons";
import { PICKER_NO_SELECTION } from "@/app/constants/picker-no-selection";

interface ControlAddCustomButtonProps {}

export const ControlAddCustomButton: React.FC<
  ControlAddCustomButtonProps
> = ({}: ControlAddCustomButtonProps): JSX.Element => {
  const { allTabs, addSymbolTileToTab, addSymbolTile } =
    useAACSymbolTilesStore();

  const [newButtonTextLabel, setNewButtonTextLabel] = useState<string>("");
  const [newButtonCategory, setNewButtonCategory] =
    useState<SymbolTileCategoryKey>(SymbolTileCategoryKey.other);
  const [newButtonTab, setNewButtonTab] = useState<string>(PICKER_NO_SELECTION);
  const [newButtonStatus, setNewButtonStatus] = useState<string>("");
  const [newButtonError, setNewButtonError] = useState<boolean>(false);

  const submitNewButtonForm = () => {
    if (newButtonTab === PICKER_NO_SELECTION) {
      setNewButtonError(true);
      setNewButtonStatus("Must select a tab");
      return;
    }
    if (!newButtonTextLabel) {
      setNewButtonError(true);
      setNewButtonStatus("Must provide some text");
      return;
    }
    const key = createUniqueKey();
    addSymbolTile({
      key: key,
      labelling: {
        text: newButtonTextLabel,
        imgSrc: undefined,
      },
      vocalization: newButtonTextLabel,
      category: Number(newButtonCategory),
    });
    addSymbolTileToTab(newButtonTab, key);

    // clean up
    setNewButtonError(false);
    setNewButtonTextLabel("");
    setNewButtonStatus("Custom button added");
    setNewButtonTab(PICKER_NO_SELECTION);
  };

  return (
    <SettingsRow
      title="Add Custom Button"
      help="Add your own personlized button."
    >
      <TextInput
        value={newButtonTextLabel}
        onChangeText={setNewButtonTextLabel}
        placeholder="Enter word or phrase..."
      />
      <Picker
        selectedValue={newButtonCategory}
        onValueChange={setNewButtonCategory}
      >
        {enumValuesOf(SymbolTileCategoryKey).map((enumKey) => (
          <Picker.Item
            label={SymbolTileCategoryProperties[enumKey].singular}
            value={enumKey}
            key={enumKey}
          />
        ))}
      </Picker>
      <Picker
        selectedValue={newButtonTab ?? PICKER_NO_SELECTION}
        onValueChange={setNewButtonTab}
      >
        <Picker.Item
          label="Select a tab..."
          value={PICKER_NO_SELECTION}
          enabled={false}
        />
        {Object.values(allTabs).map((tab) => (
          <Picker.Item key={tab.key} label={tab.name} value={tab.key} />
        ))}
      </Picker>
      <TouchableOpacity onPress={submitNewButtonForm} style={styles.create}>
        <Ionicons name="add" size={22} color="white" />
        <Text>Add custom button</Text>
      </TouchableOpacity>
      {newButtonStatus?.length > 0 && (
        <Text style={newButtonError ? styles.error : styles.success}>
          {newButtonStatus}
        </Text>
      )}
    </SettingsRow>
  );
};

const styles = StyleSheet.create({
  error: { color: "red" },
  success: { color: "green" },
  create: {
    flexDirection: "row",
    backgroundColor: "#7ab0f7ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default ControlAddCustomButton;
