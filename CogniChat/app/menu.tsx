import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MainMenu() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../CogniChat/assets/images/cognichat_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.logoText}>CogniChat</Text>
            <Text style={styles.subLogoText}>Welcome</Text>
          </View>
        </View>
      </View>

      {/* Title */}
      <View style={styles.textSection}>
        <Text style={styles.title}>Choose Your Activity</Text>
        <Text style={styles.subtitle}>
          Select the tool that best fits your current needs. You can switch between them at any time.
        </Text>
      </View>

      {/* Cards Section */}
      <View style={styles.cardRow}>
        {/* AAC Communication */}
        <View style={styles.card}>
          <Image
            source={require('../assets/images/cognichat_logo.png')}
            style={styles.cardIcon}
            resizeMode="contain"
          />
          <Text style={styles.cardTitle}>AAC Communication</Text>
          <Text style={styles.cardText}>
            Use the communication board to express your thoughts, feelings, and needs with text-to-speech support.
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bullet}>• Pre-loaded therapy vocabulary</Text>
            <Text style={styles.bullet}>• Custom buttons and phrases</Text>
            <Text style={styles.bullet}>• Text-to-speech functionality</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/aac-board-index')}>
            <Text style={styles.buttonText}>Open Communication Board</Text>
          </TouchableOpacity>
        </View>

        {/* Cognitive-Linguistic */}
        <View style={styles.card}>
          <Image
            source={require('../assets/images/cognitive_logo.png')}
            style={styles.cardIcon}
            resizeMode="contain"
          />
          <Text style={styles.cardTitle}>Cognitive-Linguistic</Text>
          <Text style={styles.cardText}>
            Practice cognitive and language skills through interactive exercises and therapeutic activities.
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bullet}>• Memory and attention exercises</Text>
            <Text style={styles.bullet}>• Language comprehension tasks</Text>
            <Text style={styles.bullet}>• Problem-solving activities</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/cognitive')}>
            <Text style={styles.buttonText}>Start Cognitive Exercises</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footer}>
        All your settings and custom configurations are saved automatically.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e8ecf8',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 36,
    height: 36,
  },
  logoText: {
    fontSize: 18,
    color: '#0d3054',
    fontWeight: 'bold',
  },
  subLogoText: {
    fontSize: 13,
    color: '#4e5e75',
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0d3054',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#4e5e75',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 15,
  },
  card: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  cardIcon: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0d3054',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#4e5e75',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 10,
  },
  bulletContainer: {
    alignSelf: 'flex-start',
    marginBottom: 18,
  },
  bullet: {
    fontSize: 13,
    color: '#2e3c53',
    marginVertical: 2,
  },
  button: {
    backgroundColor: '#0d3054',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  footer: {
    marginTop: 40,
    color: '#4e5e75',
    fontSize: 13,
    textAlign: 'center',
  },
});
