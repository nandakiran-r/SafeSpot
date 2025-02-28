import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../context/AuthContext';
import {
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import { Button } from 'react-native';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export default function RootLayout() {
  const { address, open, isConnected, provider } = useWalletConnectModal();

  const handleConnection = () => {
    if (isConnected) {
      return provider?.disconnect();
    }

    return open();
  };

  useEffect(() => {
    window.frameworkReady?.();
  }, []);

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Button
        onPress={handleConnection}
        title={isConnected ? 'Disconnect' : 'Connect'}
      />
    </AuthProvider>
  );
}