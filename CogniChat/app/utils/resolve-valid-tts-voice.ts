import * as Speech from "expo-speech";

/**
 * Helper function to resolve the best text-to-speech voice.
 * @param availableVoices - An array of voice identifiers.
 * @param targetVoice - The desired voice identifier.
 * @returns targetVoice if the voice is available, else the
 * first English voice, and as a fall back the first available voice.
 */
export function resolveValidTTSVoice(
  availableVoices: Speech.Voice[],
  targetVoice?: string
): Speech.Voice | undefined {
  if (availableVoices.length === 0) return undefined;
  const exact = availableVoices.find((v) => v.identifier === targetVoice);
  if (exact) return exact;
  const fallback = availableVoices.find((v) => v.language.startsWith("en"));
  if (fallback) return fallback;
  const lastResort = availableVoices[0];
  return lastResort;
}
