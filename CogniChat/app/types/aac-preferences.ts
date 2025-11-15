/**
 * Represents the properties of a user's global preferences
 * for the AAC portion of Cognichat.
 *
 * @remarks
 * This interface defines the important properties of the
 * user's global preferences.
 */
export interface AACPreferences {
  /**
   * The default font size of the buttons, for new buttons
   * and buttons which do not override the font size.
   * @example 12
   */
  buttonDefaultFontSize: number;

  /**
   * The default font family of the buttons, for new buttons
   * and buttons which do not override the font family.
   * @example "arial"
   */
  buttonDefaultFontFamily: string;

  /**
   * Machine learning feature:
   * Should sentence learning and prediction be enabled?
   * @example true
   */
  enableSentencePrediction: boolean;

  /**
   * Machine learning feature:
   * Should button grid learning and adaption be enabled?
   * @example true
   */
  enableButtonGridAdaption: boolean;

  /**
   * Voice to use for text-to-speech.
   * @example "system"
   */
  ttsVoice: string;

  /**
   * Voice volume of the text-to-speech.
   * @example 100
   */
  ttsVolume: number;

  /**
   * Should buttons show their image labels, if they
   * have them?
   * @example true
   */
  showButtonImageLabels: boolean;

  /**
   * Should buttons show their text labels, if they
   * have them?
   * @example true
   */
  showButtonTextLabels: boolean;

  /**
   * Should buttons be colored to their categories?
   * @example true
   */
  showButtonCategoryColors: boolean;
}

/**
 * A hardcoded set of default values for all AAC preferences.
 *
 * @remarks
 * Intended for usage with brand new user accounts and for
 * the "reset to default" option.
 */
export const defaultAACPreferences: AACPreferences = {
  buttonDefaultFontSize: 12,
  buttonDefaultFontFamily: "arial",
  enableSentencePrediction: true,
  enableButtonGridAdaption: true,
  ttsVoice: "system",
  ttsVolume: 100,
  showButtonImageLabels: true,
  showButtonTextLabels: true,
  showButtonCategoryColors: true,
};
