import React, { JSX } from "react";
import { StyleSheet, ScrollView, Text, Pressable } from "react-native";
import ControlFontSize from "./control-font-size";
import ControlLabelling from "./control-labelling";
import ControlTTS from "./control-tts";
import ControlColorCoding from "./control-color-coding";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SettingsRow from "./settings-row";
import TileCustomizer from "../tile-customizer";
import HiddenButtonsList from "../hidden-buttons-list";

interface AACSettingsPageProps {}

export const AACSettingsPage: React.FC<
  AACSettingsPageProps
> = ({}: AACSettingsPageProps): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close" size={40} color="black" />
        </Pressable>
        <Text style={styles.title}>Settings & Personalization</Text>
        <SettingsRow
          title="Font Size"
          help="Use a font size that is easiest for you to see."
        >
          <ControlFontSize />
        </SettingsRow>
        <ControlLabelling />
        <SettingsRow
          title="Voice"
          help="Which voice should the text-to-speech use? Availability depends on your device."
        >
          <ControlTTS />
        </SettingsRow>
        <SettingsRow
          title="Color Coding"
          help="Should buttons be color coded by category?"
        >
          <ControlColorCoding />
        </SettingsRow>
        <SettingsRow
          title="Add Custom Button"
          help="Add your own personlized button."
        >
          <TileCustomizer />
        </SettingsRow>
        <SettingsRow
          title="Removed Buttons"
          help="Restore or permanently delete buttons you've removed."
        >
          <HiddenButtonsList />
        </SettingsRow>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
  title: { fontSize: 20 },
  container: {
    padding: 10,
    gap: 10,
  },
});

export default AACSettingsPage;
