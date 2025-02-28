import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { User, Shield, LogOut, ChevronRight, Bell, Lock, HelpCircle } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { walletAddress, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  
  // Truncate wallet address for display
  const displayAddress = walletAddress 
    ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
    : 'Not connected';

  const handleLogout = async () => {
    await logout();
    router.replace('/auth');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <User size={40} color="#FFFFFF" />
        </View>
        <Text style={styles.walletAddress}>{displayAddress}</Text>
        <Text style={styles.userLevel}>Anonymous Reporter</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <View style={styles.menuItem}>
          <View style={styles.menuItemIcon}>
            <Shield size={20} color="#3B82F6" />
          </View>
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemTitle}>Privacy Settings</Text>
          </View>
          <ChevronRight size={20} color="#9CA3AF" />
        </View>
        
        <View style={styles.menuItem}>
          <View style={styles.menuItemIcon}>
            <Bell size={20} color="#3B82F6" />
          </View>
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemTitle}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#D1D5DB', true: '#BFDBFE' }}
            thumbColor={notificationsEnabled ? '#3B82F6' : '#9CA3AF'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        
        <View style={styles.menuItem}>
          <View style={styles.menuItemIcon}>
            <Lock size={20} color="#3B82F6" />
          </View>
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemTitle}>Wallet Security</Text>
            <Text style={styles.menuItemDescription}>Manage your wallet connection</Text>
          </View>
          <ChevronRight size={20} color="#9CA3AF" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <View style={styles.menuItem}>
          <View style={styles.menuItemIcon}>
            <HelpCircle size={20} color="#3B82F6" />
          </View>
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemTitle}>Help Center</Text>
            <Text style={styles.menuItemDescription}>Get help with the app</Text>
          </View>
          <ChevronRight size={20} color="#9CA3AF" />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color="#EF4444" />
        <Text style={styles.logoutButtonText}>Disconnect Wallet</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  walletAddress: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: 8,
    paddingLeft: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 32,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4444',
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
});