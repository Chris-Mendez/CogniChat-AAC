import React, { JSX } from "react";
import { StyleSheet } from "react-native";
import SettingsRow from "./settings-row";
import TileCustomizer from "../tile-customizer";

interface ControlAddCustomButtonProps {}

export const ControlAddCustomButton: React.FC<
  ControlAddCustomButtonProps
> = ({}: ControlAddCustomButtonProps): JSX.Element => {
  return (
    <SettingsRow
      title="Add Custom Button"
      help="Add your own personlized button."
    >
      <TileCustomizer />
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
