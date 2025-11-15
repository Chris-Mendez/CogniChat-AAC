import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

import { AuthCard } from '@/components/auth/AuthCard';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { LogoPanel } from '@/components/auth/LogoPanel';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
//import { useAuth } from '@/src/context/AuthContext';

export default function SignupScreen() {
  //const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    setLoading(true);
    try {
      // Placeholder: integrate actual sign-up via authService or Supabase
      //await (auth as any).signIn?.(email, password);
      router.replace('./');
    } catch (err) {
      console.error('Signup failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.outer}>
      <View style={styles.left}>
        <LogoPanel />
      </View>

      <View style={styles.right}>
        <AuthCard>
          <ThemedText type="title">Create an account</ThemedText>

          <ThemedText style={{ marginTop: 8 }}>
            Sign up to get started with CogniChat
          </ThemedText>

          <ThemedText style={{ marginTop: 18 }}>Email address</ThemedText>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            accessibilityLabel="Email address"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <ThemedText style={{ marginTop: 12 }}>Password</ThemedText>
          <PasswordInput
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            accessibilityLabel="Password"
          />

          <ThemedText style={{ marginBottom: 8, color: '#777777' }}>
            Password must be 8 or more characters. Don't reuse passwords from other sites.
          </ThemedText>

          <AuthButton onPress={onCreate} accessibilityLabel="Create an account" disabled={loading}>
            Create an account
          </AuthButton>

          <ThemedText
            type="link"
            style={{ marginTop: 12 }}
            onPress={() => router.push('./login')}
            accessibilityRole="link">
            Already have an account? Log in
          </ThemedText>
        </AuthCard>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    backgroundColor: '#0d3054',
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  input: {
    height: 46,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F5F7FA',
    marginTop: 6,
  },
});
