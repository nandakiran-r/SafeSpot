import { useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield } from 'lucide-react-native';

export default function SplashScreen() {
  const { isAuthenticated, hasCompletedOnboarding } = useAuth();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      if (!hasCompletedOnboarding) {
        router.replace('/onboarding');
      } else if (!isAuthenticated) {
        router.replace('/auth');
      } else {
        router.replace('/(tabs)');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, hasCompletedOnboarding]);

  return (
    <LinearGradient
      colors={['#1E3A8A', '#3B82F6']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Shield size={80} color="#FFFFFF" strokeWidth={1.5} />
        <Text style={styles.title}>SafeReport</Text>
        <Text style={styles.subtitle}>Anonymous. Secure. Rewarded.</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#E5E7EB',
    marginTop: 8,
  },
});