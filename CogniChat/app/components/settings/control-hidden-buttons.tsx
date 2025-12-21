import React from "react";
import { StyleSheet } from "react-native";
import SettingsRow from "./settings-row";
import HiddenButtonsList from "../hidden-buttons-list";

interface ControlRemovedButtonsProps {}

const ControlRemovedButtons: React.FC<ControlRemovedButtonsProps> = ({}) => {
  return (
    <SettingsRow
      title="Removed Buttons"
      help="Restore or permanently delete buttons you've removed."
    >
      <HiddenButtonsList />
    </SettingsRow>
  );
};

const styles = StyleSheet.create({});

export default ControlRemovedButtons;
