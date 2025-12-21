import React, { JSX } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import ControlFontSize from "./control-font-size";
import ControlLabelling from "./control-labelling";
import ControlTTS from "./control-tts";
import ControlColorCoding from "./control-color-coding";
import ControlAddCustomButton from "./control-add-custom-button";
import ControlHiddenButtons from "./control-hidden-buttons";

interface SettingsPageProps {}

export const SettingsPage: React.FC<
  SettingsPageProps
> = ({}: SettingsPageProps): JSX.Element => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Settings & Personalization</Text>
      <ControlFontSize />
      <ControlLabelling />
      <ControlTTS />
      <ControlColorCoding />
      <ControlAddCustomButton />
      <ControlHiddenButtons />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 20 },
  container: {
    padding: 10,
    gap: 10,
  },
});

export default SettingsPage;
