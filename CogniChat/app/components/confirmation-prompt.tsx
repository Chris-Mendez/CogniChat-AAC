import React, { JSX } from "react";
import BasePrompt from "./base-prompt";

/**
 * @interface ConfirmationPromptProps
 *
 * @property {string} promptMessage - The prompt message.
 * @property {function} onConfirm - Callback when confirmed by the user.
 * @property {function} onCancel - Callback when cancelled by the user.
 */
type ConfirmationPromptProps = {
  promptMessage: string;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * A component for prompting the user to confirm or cancel something.
 *
 * @param {ConfirmationPromptProps} props {@link ConfirmationPromptProps}
 * @returns {JSX.Element}
 */
const ConfirmationPrompt = ({
  promptMessage,
  onConfirm,
  onCancel,
}: ConfirmationPromptProps): JSX.Element => {
  return (
    <BasePrompt
      promptMessage={promptMessage}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default ConfirmationPrompt;
