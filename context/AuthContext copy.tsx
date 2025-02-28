


import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  walletAddress: string | null;
  login: ({ address, signature }: { address: string; signature: string }) => Promise<void>; // Updated here
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load authentication state from storage
    const loadAuthState = async () => {
      try {
        const [authValue, onboardingValue, walletValue] = await Promise.all([
          AsyncStorage.getItem('isAuthenticated'),
          AsyncStorage.getItem('hasCompletedOnboarding'),
          AsyncStorage.getItem('walletAddress'),
        ]);
        
        setIsAuthenticated(authValue === 'true');
        setHasCompletedOnboarding(onboardingValue === 'true');
        setWalletAddress(walletValue);
      } catch (error) {
        console.error('Failed to load auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);

  const login = async ({ address, signature }: { address: string; signature: string }) => {
    try {
      // In a real app, this would connect to MetaMask and get the wallet address
      const mockWalletAddress = '0x' + Math.random().toString(16).substr(2, 40);
      
      await Promise.all([
        AsyncStorage.setItem('isAuthenticated', 'true'),
        AsyncStorage.setItem('walletAddress', mockWalletAddress),
      ]);
      
      setIsAuthenticated(true);
      setWalletAddress(mockWalletAddress);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem('isAuthenticated', 'false'),
        AsyncStorage.removeItem('walletAddress'),
      ]);
      
      setIsAuthenticated(false);
      setWalletAddress(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        hasCompletedOnboarding,
        walletAddress,
        login,
        logout,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};