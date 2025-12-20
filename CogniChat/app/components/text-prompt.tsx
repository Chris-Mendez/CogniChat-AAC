import React, { JSX, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import BasePrompt from "./base-prompt";

/**
 * @interface TextPromptProps
 *
 * @property {string} promptMessage - The prompt message.
 * @property {string} placeholderText - The placeholder for the text input.
 * @property {function} onSubmit - Callback for when the user submits.
 * @property {function} onCancel - Callback for when the user cancels.
 */
type TextPromptProps = {
  promptMessage: string;
  placeholderText: string;
  onSubmit: (text: string) => void;
  onCancel: () => void;
};

/**
 * A component for prompting the user to give some text input.
 *
 * @param {TextPromptProps} props {@link TextPromptProps}
 * @returns {JSX.Element}
 */
const TextPrompt = ({
  promptMessage,
  placeholderText,
  onSubmit,
  onCancel,
}: TextPromptProps): JSX.Element => {
  const [text, setText] = useState<string>("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text);
  };

  return (
    <BasePrompt
      promptMessage={promptMessage}
      onConfirm={handleSubmit}
      onCancel={onCancel}
    >
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholderText}
        onSubmitEditing={handleSubmit}
      />
    </BasePrompt>
  );
};

const styles = StyleSheet.create({});

export default TextPrompt;
