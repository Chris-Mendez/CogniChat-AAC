import React, { JSX } from "react";
import { StyleSheet, ScrollView, Text, Pressable } from "react-native";
import ControlFontSize from "./control-font-size";
import ControlLabelling from "./control-labelling";
import ControlTTS from "./control-tts";
import ControlColorCoding from "./control-color-coding";
import ControlAddCustomButton from "./control-add-custom-button";
import ControlHiddenButtons from "./control-hidden-buttons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
        <ControlFontSize />
        <ControlLabelling />
        <ControlTTS />
        <ControlColorCoding />
        <ControlAddCustomButton />
        <ControlHiddenButtons />
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
