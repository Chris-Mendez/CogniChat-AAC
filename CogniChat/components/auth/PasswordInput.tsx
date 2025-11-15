import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type PasswordInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  accessibilityLabel?: string;
};

// Special component for password input with show/hide toggle, saves space on login/signup pages
export function PasswordInput({ value, onChangeText, placeholder, accessibilityLabel }: PasswordInputProps) {
  const [hidden, setHidden] = useState(true);

  return (
    <ThemedView style={styles.wrapper}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={hidden}
        placeholder={placeholder}
        accessibilityLabel={accessibilityLabel}
        style={styles.input}
        placeholderTextColor="#9AA4B2"
        autoCapitalize="none"
        importantForAutofill="yes"
        textContentType="password"
      />

      <TouchableOpacity
        accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
        onPress={() => setHidden((v) => !v)}
        style={styles.iconButton}
        accessibilityRole="button">
        <MaterialIcons name={hidden ? "visibility-off" : "visibility"} size={18} color="#6B7280" />
        {/*<IconSymbol name={hidden ? ('eye.closed' as any) : ('eye.open' as any)} size={18} color="#6B7280" />*/}
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  input: {
    height: 46,
    paddingHorizontal: 14,
    paddingRight: 40,
    borderRadius: 8,
    backgroundColor: '#F5F7FA',
    color: '#0b1220',
  },
  iconButton: {
    position: 'absolute',
    right: 8,
    top: 10,
    padding: 6,
  },
});
