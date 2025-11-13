import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';
const LogoImage = require('../../assets/images/cognichat_logo.png');

// Pretty logo panel for authentication screens. Not very pretty yet.
export function LogoPanel() {
  return (
    <View style={styles.container} accessible accessibilityRole="image">
      <View style={styles.logoWrapper}>
        <Image
          source={LogoImage}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="CogniChat logo"
        />
      </View>

      <ThemedText type="title" style={styles.title}>
        CogniChat
      </ThemedText>
      <ThemedText style={styles.subtitle}>Professional AAC{"\n"}Communication Tool</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: 'white',
  },
  logo: {
    width: 68,
    height: 68
  },
  title: {
    textAlign: 'center',
    marginTop: 8,
    color: "white"
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 6,
    fontSize: 14,
    color: 'white',
  },
});
