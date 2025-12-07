import React, { useState } from "react";
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
import { SymbolTileCategoryKey } from "../types/symbol-tile-categories";
import { FontAwesome } from "@expo/vector-icons";

interface AACUserSettingsPageProps {}

const TTS_VOICES = ["System Male", "System Female"];

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
  } = useAACPreferencesStore();

  const [newButtonTextLabel, setNewButtonTextLabel] = useState<string>();
  const [newButtonImageURL, setNewButtonImageURL] = useState<string>();
  const [newButtonCategory, setNewButtonCategory] =
    useState<SymbolTileCategoryKey>();
  const [newButtonTab, setNewButtonTab] = useState<string>();

  const submitNewButtonForm = () => {};

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
        >
          <Picker.Item label="Small" value="16" />
          <Picker.Item label="Medium" value="22" />
          <Picker.Item label="Large" value="28" />
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Show Image Labels</Text>
        <Text style={styles.helper}>Should buttons have images?</Text>
        <Switch
          value={showButtonImageLabels}
          onValueChange={(v) => {
            setShowButtonImageLabels(v);
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Show Text Labels</Text>
        <Text style={styles.helper}>Should buttons have text?</Text>
        <Switch
          value={showButtonTextLabels}
          onValueChange={(v) => {
            setShowButtonTextLabels(v);
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Text-to-Speech Voice</Text>
        <Text style={styles.helper}>Availability depends on your device.</Text>
        <Picker
          selectedValue={ttsVoice}
          onValueChange={(v) => {
            setTTSVoice(v);
          }}
        >
          {TTS_VOICES.map((voice) => (
            <Picker.Item key={voice} label={voice} value={voice} />
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
          {Object.keys(SymbolTileCategoryKey)
            .filter((key) => isNaN(Number(key)))
            .map((key) => (
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>{key}</Text>
              </View>
            ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Add a Custom Button</Text>
        <Text style={styles.helper}>Add your own personalized button.</Text>
        <View style={styles.subsection}>
          <Text style={styles.sectionHeader}>Text Label</Text>
          <TextInput
            value={newButtonTextLabel}
            onChangeText={setNewButtonTextLabel}
            placeholder="..."
          />

          <Text style={styles.sectionHeader}>Image Label</Text>
          <TextInput
            value={newButtonImageURL}
            onChangeText={setNewButtonImageURL}
            placeholder="..."
          />

          <Text style={styles.sectionHeader}>Category</Text>
          <Picker
            selectedValue={newButtonCategory}
            onValueChange={setNewButtonCategory}
          >
            {Object.keys(SymbolTileCategoryKey)
              .filter((key) => isNaN(Number(key)))
              .map((key) => (
                <Picker.Item label={key} value={key} />
              ))}
          </Picker>

          <Text style={styles.sectionHeader}>Tab</Text>
          <Picker
            selectedValue={newButtonTab}
            onValueChange={setNewButtonTab}
          ></Picker>

          <TouchableOpacity onPress={submitNewButtonForm} style={styles.button}>
            <FontAwesome name="plus" size={20} color="white" /> Add custom
            button
          </TouchableOpacity>
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
  },
  helper: {
    fontSize: 14,
    color: "#565656ff",
  },
  subsection: {
    padding: 15,
    borderWidth: 1,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#7ab0f7ff",
    borderRadius: 15,
    padding: 10,
    justifyContent: "center",
    color: "white",
  },
});

export default AACUserSettingsPage;
