import { Picker } from "@react-native-picker/picker";
import { JSX, useEffect, useState } from "react";
import * as Speech from "expo-speech";
import { StyleSheet } from "react-native";
import { useAACPreferencesStore } from "../contexts/aac-preferences-provider";
import { resolveValidTTSVoice } from "../utils/resolve-valid-tts-voice";
import { PICKER_NO_SELECTION } from "../constants/picker-no-selection";

interface TTSVoiceSelectorProps {}

export const TTSVoiceSelector: React.FC<
  TTSVoiceSelectorProps
> = ({}: TTSVoiceSelectorProps): JSX.Element => {
  const { ttsVoice, setTTSVoice } = useAACPreferencesStore();

  const [availableTTSVoices, setAvailableTTSVoices] = useState<Speech.Voice[]>(
    []
  );

  useEffect(() => {
    const loadVoices = async () => {
      try {
        const availableVoices = await Speech.getAvailableVoicesAsync();
        const resolvedVoice = resolveValidTTSVoice(availableVoices, ttsVoice);
        setTTSVoice(resolvedVoice ? resolvedVoice.identifier : undefined);
        setAvailableTTSVoices(availableVoices);
      } catch (error) {
        setTTSVoice(undefined);
      }
    };
    loadVoices();
  }, []);

  return (
    <Picker
      selectedValue={ttsVoice ?? PICKER_NO_SELECTION}
      onValueChange={setTTSVoice}
      style={styles.picker}
      itemStyle={styles.pickerItem}
    >
      <Picker.Item
        label="Select a voice..."
        value={PICKER_NO_SELECTION}
        enabled={false}
      />
      {availableTTSVoices.map((voice) => (
        <Picker.Item
          key={voice.identifier}
          label={voice.name + " (" + voice.language + ")"}
          value={voice.identifier}
        />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  picker: { width: 300 },
  pickerItem: {
    color: "black",
  },
});

export default TTSVoiceSelector;
