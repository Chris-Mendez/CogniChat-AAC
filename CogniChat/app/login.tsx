import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { AuthButton } from '@/components/auth/AuthButton';
import { AuthCard } from '@/components/auth/AuthCard';
import { LogoPanel } from '@/components/auth/LogoPanel';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
//import { useAuth } from '@/src/context/AuthContext';

export default function LoginScreen() {
  //const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    try {
      // AuthContext is implemented in JS; calls must be cast to "any"

      //await (auth as any).signIn?.(email, password);

      // AuthContext will redirect after sign-in when integrated
      router.replace('/menu');
    } catch (err) {
      console.error('Login failed', err);
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
          <ThemedText type="title">Welcome Back</ThemedText>
          <ThemedText style={{ marginTop: 8 }}>
            Log in to continue to CogniChat
          </ThemedText>

          <ThemedText style={{ marginTop: 18 }}>Email</ThemedText>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            accessibilityLabel="Email"
            style={styles.input}
            autoCapitalize="none"
          />

          <ThemedText style={{ marginTop: 12 }}>Password</ThemedText>
          <PasswordInput value={password} onChangeText={setPassword} placeholder="Enter your password" accessibilityLabel="Password" />

          <AuthButton onPress={onLogin} accessibilityLabel="Log in" disabled={loading}>
            Log In
          </AuthButton>

          <ThemedText
            type="link"
            style={{ marginTop: 12 }}
            onPress={() => router.push('./signup')}
            accessibilityRole="link">
            Create an account
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
