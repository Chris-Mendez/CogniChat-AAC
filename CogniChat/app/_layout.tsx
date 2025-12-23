import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AACSymbolTilesProvider } from "./contexts/aac-symbol-tiles-provider";
import { AACPreferencesProvider } from "./contexts/aac-preferences-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <AACPreferencesProvider>
          <AACSymbolTilesProvider>
            <Stack>
              <Stack.Screen
                name="aac-board"
                options={{ headerShown: false, gestureEnabled: true }}
              />
              <Stack.Screen
                name="aac-settings"
                options={{ headerShown: false, gestureEnabled: false }}
              />
            </Stack>
            <StatusBar style="auto" />
          </AACSymbolTilesProvider>
        </AACPreferencesProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
