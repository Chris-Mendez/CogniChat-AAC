import React, { JSX } from "react";
import { StyleSheet, View, Text } from "react-native";

interface SettingsRowProps {
  title: string;
  help: string;
  children?: React.ReactNode;
}

export const SettingsRow: React.FC<SettingsRowProps> = ({
  title,
  help,
  children,
}: SettingsRowProps): JSX.Element => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.help}>{help}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontWeight: "bold" },
  help: { color: "#484848ff" },
});

export default SettingsRow;
