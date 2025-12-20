import React, { JSX } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

/**
 * @interface BasePromptProps
 *
 * @property {string} promptMessage - The prompt message.
 * @property {function} onConfirm - Callback when confirmed by the user.
 * @property {function} onCancel - Callback when cancelled by the user.
 * @property {React.ReactNode} children: Child components.
 */
type BasePromptProps = {
  promptMessage: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
};

/**
 * A component for prompting the user to confirm or cancel something.
 *
 * @param {BasePromptProps} props {@link BasePromptProps}
 * @returns {JSX.Element}
 */
const BasePrompt = ({
  promptMessage,
  onConfirm,
  onCancel,
  children,
}: BasePromptProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.promptMessage}>{promptMessage}</Text>
      {children}
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.confirmButton]}
          onPress={onConfirm}
        >
          <Text>Confirm</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  promptMessage: {
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  button: {
    padding: 10,
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: "green",
  },
  cancelButton: {
    backgroundColor: "red",
  },
});

export default BasePrompt;
