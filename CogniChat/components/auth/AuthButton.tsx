import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';

type AuthButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  accessibilityLabel?: string;
  disabled?: boolean;
};

export function AuthButton({ children, onPress, accessibilityLabel, disabled = false }: AuthButtonProps) {
  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.button, disabled && styles.disabled]}
      activeOpacity={0.85}
      disabled={disabled}>
      <ThemedText style={styles.text} type="defaultSemiBold">
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: '#1F6AA5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
