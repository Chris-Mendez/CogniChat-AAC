import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAACPreferencesStore } from "../contexts/aac-preferences-provider";
import { Picker } from "@react-native-picker/picker";
import {
  SymbolTileCategoryKey,
  SymbolTileCategoryProperties,
} from "../types/symbol-tile-categories";
import { FontAwesome } from "@expo/vector-icons";
import CategoryColorSelector from "./category-color-selector";
import { enumValuesOf } from "../utils/enum-iterator";
import { useAACSymbolTilesStore } from "../contexts/aac-symbol-tiles-provider";
import uuid from "react-native-uuid";
import { AVAILABLE_CATEGORY_COLORS } from "../constants/default-aac-preferences";
import * as Speech from "expo-speech";
import { resolveValidTTSVoice } from "../utils/resolve-valid-tts-voice";

interface AACUserSettingsPageProps {}

const PICKER_NONE = "undefined";

const AACUserSettingsPage: React.FC<AACUserSettingsPageProps> = ({}) => {
  const {
    buttonDefaultFontSize,
    setButtonDefaultFontSize,
    showButtonImageLabels,
    setShowButtonImageLabels,
    showButtonTextLabels,
    setShowButtonTextLabels,
    ttsVoice,
    setTTSVoice,
    showButtonCategoryColors,
    setShowButtonCategoryColors,
    buttonCategoryColors,
    setButtonCategoryColors,
  } = useAACPreferencesStore();

  const { allTabs, addSymbolTileToTab, addSymbolTile } =
    useAACSymbolTilesStore();

  const [newButtonTextLabel, setNewButtonTextLabel] = useState<string>("");
  const [newButtonImageURL, setNewButtonImageURL] = useState<string>();
  const [newButtonCategory, setNewButtonCategory] =
    useState<SymbolTileCategoryKey>(SymbolTileCategoryKey.other);
  const [newButtonTab, setNewButtonTab] = useState<string>(PICKER_NONE);
  const [newButtonStatus, setNewButtonStatus] = useState<string>("");
  const [newButtonError, setNewButtonError] = useState<boolean>(false);
  const [availableTTSVoices, setAvailableTTSVoices] = useState<Speech.Voice[]>(
    []
  );

  const submitNewButtonForm = () => {
    if (newButtonTab === PICKER_NONE) {
      setNewButtonError(true);
      setNewButtonStatus("Must select a tab");
      return;
    }
    if (!newButtonTextLabel) {
      setNewButtonError(true);
      setNewButtonStatus("Must provide some text");
      return;
    }
    const key = uuid.v4();
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
    setNewButtonTab(PICKER_NONE);
  };

  const toggleShowImageLabels = (v: boolean) => {
    if (v == false && showButtonTextLabels == false) {
      setShowButtonTextLabels(true);
    }
    setShowButtonImageLabels(v);
  };

  const toggleShowTextLabels = (v: boolean) => {
    if (v == false && showButtonImageLabels == false) {
      setShowButtonImageLabels(true);
    }
    setShowButtonTextLabels(v);
  };

  useEffect(() => {
    const loadVoices = async () => {
      try {
        const availableVoices = await Speech.getAvailableVoicesAsync();
        const resolvedVoice = resolveValidTTSVoice(availableVoices, ttsVoice);
        setTTSVoice(resolvedVoice ? resolvedVoice.identifier : undefined);
        setAvailableTTSVoices(availableVoices);
      } catch (error) {
        setTTSVoice(undefined);
      }
    };
    loadVoices();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>Settings & Personalization</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Font Size</Text>
        <Text style={styles.helper}>
          Use a font size that is easiest for you to see.
        </Text>
        <Picker
          selectedValue={buttonDefaultFontSize}
          onValueChange={(v) => {
            setButtonDefaultFontSize(v);
          }}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label={"Small"} value={14} key={14} />
          <Picker.Item label={"Medium"} value={22} key={22} />
          <Picker.Item label={"Large"} value={32} key={32} />
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Show Image Labels</Text>
        <Text style={styles.helper}>Should buttons have images?</Text>
        <Switch
          value={showButtonImageLabels}
          onValueChange={(v) => {
            toggleShowImageLabels(v);
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Show Text Labels</Text>
        <Text style={styles.helper}>Should buttons have text?</Text>
        <Switch
          value={showButtonTextLabels}
          onValueChange={(v) => {
            toggleShowTextLabels(v);
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Text-to-Speech Voice</Text>
        <Text style={styles.helper}>Availability depends on your device.</Text>
        <Picker
          selectedValue={ttsVoice ?? PICKER_NONE}
          onValueChange={setTTSVoice}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item
            label="Select a voice..."
            value={PICKER_NONE}
            enabled={false}
          />
          {availableTTSVoices.map((voice) => (
            <Picker.Item
              key={voice.identifier}
              label={voice.name + " (" + voice.language + ")"}
              value={voice.identifier}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Color Coding</Text>
        <Text style={styles.helper}>
          Should buttons be color coded by category?
        </Text>
        <Switch
          value={showButtonCategoryColors}
          onValueChange={(v) => {
            setShowButtonCategoryColors(v);
          }}
        />
      </View>

      {showButtonCategoryColors && (
        <View style={styles.subsection}>
          <Text style={styles.sectionHeader}>Category Colors</Text>
          <Text style={styles.helper}>
            Each category must have a unique color.
          </Text>
          <CategoryColorSelector
            selectedColors={buttonCategoryColors}
            setSelectedColors={setButtonCategoryColors}
            availableColors={AVAILABLE_CATEGORY_COLORS}
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Add a Custom Button</Text>
        <Text style={styles.helper}>Add your own personalized button.</Text>
        <View style={styles.subsection}>
          <Text style={styles.sectionHeader}>Text</Text>
          <Text style={styles.helper}>Optional</Text>
          <TextInput
            value={newButtonTextLabel}
            onChangeText={setNewButtonTextLabel}
            placeholder="Enter word or phrase..."
          />

          <Text style={styles.sectionHeader}>Category</Text>
          <Text style={styles.helper}>Required</Text>
          <Picker
            selectedValue={newButtonCategory}
            onValueChange={setNewButtonCategory}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {enumValuesOf(SymbolTileCategoryKey).map((enumKey) => (
              <Picker.Item
                label={SymbolTileCategoryProperties[enumKey].singular}
                value={enumKey}
              />
            ))}
          </Picker>

          <Text style={styles.sectionHeader}>Tab</Text>
          <Text style={styles.helper}>Required</Text>
          <Picker
            selectedValue={newButtonTab ?? PICKER_NONE}
            onValueChange={setNewButtonTab}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item
              label="Select a tab..."
              value={PICKER_NONE}
              enabled={false}
            />
            {Object.values(allTabs).map((tab) => (
              <Picker.Item label={tab.name} value={tab.key} />
            ))}
          </Picker>

          <TouchableOpacity
            onPress={submitNewButtonForm}
            style={styles.addCustomBtn}
          >
            <FontAwesome name="plus" size={20} color="white" />
            <Text style={styles.addCustomBtnText}> Add custom button</Text>
          </TouchableOpacity>

          {newButtonStatus && (
            <Text style={newButtonError ? styles.error : styles.success}>
              {newButtonStatus}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Removed Buttons</Text>
        <Text style={styles.helper}>
          Restore or permanently delete buttons you've removed.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 16,
    marginTop: 10,
  },
  helper: {
    fontSize: 14,
    color: "#565656ff",
  },
  subsection: {
    padding: 15,
    borderWidth: 1,
  },
  addCustomBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#7ab0f7ff",
    borderRadius: 15,
    padding: 10,
    justifyContent: "center",
    color: "white",
    marginTop: 10,
  },
  addCustomBtnText: {
    marginLeft: 10,
    color: "white",
    fontWeight: "bold",
  },
  picker: {},
  pickerItem: {
    color: "black",
  },
  error: {
    color: "red",
  },
  success: {
    color: "green",
  },
});

export default AACUserSettingsPage;
