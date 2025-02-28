import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Linking, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { Shield, AlertCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import { useWalletConnectModal, WalletConnectModal } from '@walletconnect/modal-react-native';

export default function AuthScreen() {

  const { address } = useWalletConnectModal();

  const projectId = '0694604af26d11b2e4f3873710c5907c';

  const providerMetadata = {
    name: 'SafeSpot',
    description: 'SafeSpot',
    url: 'https://safespot.com/',
    icons: ['https://cloud.reown.com/favicon.ico'],
    redirect: {
      native: 'safespot://',
      universal: 'com.X.SafeSpot',
    },
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  // Handle deep link when app opens from background
  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      handleMetaMaskResponse(url);
    };

    // Add event listener for deep linking
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Check if app was opened via deep link
    Linking.getInitialURL().then(url => {
      if (url) {
        handleMetaMaskResponse(url);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleMetaMaskResponse = (url: string | URL) => {
    if (!url) return;

    // Parse the URL to extract authentication data
    // The format would depend on your specific implementation
    // Example: safereport://callback?address=0x123...&signature=0xabc...

    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === 'callback') {
        // Extract wallet address from params
        const address = urlObj.searchParams.get('address');
        const signature = urlObj.searchParams.get('signature');

        if (address && signature) {
          // Validate the signature on your backend here
          // Then complete the login process
          // login({ address, signature }); // Fix: Pass the arguments as an object
          router.replace('/(tabs)');
        } else {
          setError('Authentication failed. Missing wallet information.');
        }
      }
    } catch (err) {
      console.error('Failed to parse deep link URL:', err);
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMetaMaskLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Mobile implementation using deep linking
      // Documentation: https://docs.metamask.io/guide/mobile-linking.html

      // Create the deep link parameters
      const redirectUrl = encodeURIComponent('https://zamil.me');

      // WalletConnect v2 protocol support
      // Using MetaMask's universal links for better reliability across devices
      const metaMaskDeepLink = `https://metamask.app.link/dapp/${redirectUrl}`;

      // Alternative direct scheme for older MetaMask versions
      const metaMaskDirectLink = `metamask://dapp?redirect=${redirectUrl}`;

      // Try to open MetaMask
      const canOpenMetaMask = await Linking.canOpenURL(metaMaskDirectLink);

      if (canOpenMetaMask) {
        // Open MetaMask app directly
        await Linking.openURL(metaMaskDirectLink);
      } else {
        // Try universal link first
        try {
          await Linking.openURL(metaMaskDeepLink);
        } catch (err) {
          // MetaMask not installed, redirect to app store
          const storeUrl = Platform.OS === 'ios'
            ? 'https://apps.apple.com/us/app/metamask/id1438144202'
            : 'https://play.google.com/store/apps/details?id=io.metamask';

          // Ask user if they want to install MetaMask
          Alert.alert(
            'MetaMask Required',
            'MetaMask app is not installed. Would you like to install it now?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => setIsLoading(false)
              },
              {
                text: 'Install',
                onPress: async () => {
                  await WebBrowser.openBrowserAsync(storeUrl);
                  setIsLoading(false);
                }
              }
            ]
          );
        }
      }
    } catch (err) {
      console.error('MetaMask login error:', err);
      setError('Failed to connect with MetaMask. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#1E3A8A', '#3B82F6']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Shield size={60} color="#FFFFFF" strokeWidth={1.5} />
        </View>

        <Text style={styles.title}>SafeReport</Text>
        <Text style={styles.subtitle}>Connect with MetaMask to continue</Text>

        {error ? (
          <View style={styles.errorContainer}>
            <AlertCircle size={20} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {address && <Text>{address}</Text>}

        <WalletConnectModal
          projectId={projectId}
          providerMetadata={providerMetadata}
        />
        {/* <TouchableOpacity 
          style={styles.metamaskButton}
          onPress={handleMetaMaskLogin}
          // onPress={() => router.push('/(tabs)')}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#3B82F6" />
          ) : (
            <>
              <View style={styles.metamaskIconContainer}>
                <Text style={styles.metamaskIcon}>🦊</Text>
              </View>
              <Text style={styles.metamaskButtonText}>Connect with MetaMask</Text>
            </>
          )}
        </TouchableOpacity> */}

        <Text style={styles.securityNote}>
          Your identity is protected. We use blockchain technology to ensure your reports remain anonymous while still being verifiable.
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E5E7EB',
    marginBottom: 32,
    textAlign: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  errorText: {
    color: '#EF4444',
    marginLeft: 8,
  },
  metamaskButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 24,
  },
  metamaskIconContainer: {
    marginRight: 12,
  },
  metamaskIcon: {
    fontSize: 24,
  },
  metamaskButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  securityNote: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 20,
  },
});