// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'eye.open': 'visibility',
  'eye.closed': 'visibility-off',
} as unknown as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  // If a mapping isn't present, fall back to a neutral icon to avoid runtime errors.
  const materialName = (MAPPING as Record<string, string>)[name] ?? 'help-outline';
  if (materialName === 'help-outline') {
    // Small dev-time hint to make missing mappings visible in logs
    // (kept minimal so it doesn't spam in production — you can gate on __DEV__ if desired)
    // eslint-disable-next-line no-console
    console.warn(`[IconSymbol] missing mapping for "${String(name)}", using fallback icon.`);
  }

  return <MaterialIcons color={color} size={size} name={materialName as any} style={style} />;
}
