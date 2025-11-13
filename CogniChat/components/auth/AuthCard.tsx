import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/themed-view';

export function AuthCard({ children }: PropsWithChildren) {
  return (
    <ThemedView style={styles.container} lightColor="#ffffff" darkColor="#0b1220">
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 420,
    padding: 24,
    borderRadius: 12,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },
});
