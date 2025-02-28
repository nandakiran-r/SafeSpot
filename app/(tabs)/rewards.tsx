import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Award, TrendingUp, ArrowRight, Gift } from 'lucide-react-native';

export default function RewardsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Your Balance</Text>
        <Text style={styles.balanceValue}>0.00 TOKENS</Text>
        <View style={styles.balanceActions}>
          <TouchableOpacity style={styles.balanceButton}>
            <Text style={styles.balanceButtonText}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.balanceButton, styles.balanceButtonSecondary]}>
            <Text style={styles.balanceButtonTextSecondary}>History</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Reward Tiers</Text>
        </View>
        
        <View style={styles.tierCard}>
          <View style={[styles.tierIconContainer, { backgroundColor: '#EFF6FF' }]}>
            <Award size={24} color="#3B82F6" />
          </View>
          <View style={styles.tierContent}>
            <Text style={styles.tierTitle}>Bronze Reporter</Text>
            <Text style={styles.tierDescription}>Submit 5 verified reports to unlock</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '0%' }]} />
              </View>
              <Text style={styles.progressText}>0/5</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.tierCard}>
          <View style={[styles.tierIconContainer, { backgroundColor: '#F0F9FF' }]}>
            <Award size={24} color="#0EA5E9" />
          </View>
          <View style={styles.tierContent}>
            <Text style={styles.tierTitle}>Silver Reporter</Text>
            <Text style={styles.tierDescription}>Submit 15 verified reports to unlock</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '0%' }]} />
              </View>
              <Text style={styles.progressText}>0/15</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.tierCard}>
          <View style={[styles.tierIconContainer, { backgroundColor: '#FFFBEB' }]}>
            <Award size={24} color="#F59E0B" />
          </View>
          <View style={styles.tierContent}>
            <Text style={styles.tierTitle}>Gold Reporter</Text>
            <Text style={styles.tierDescription}>Submit 30 verified reports to unlock</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '0%' }]} />
              </View>
              <Text style={styles.progressText}>0/30</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Reward Opportunities</Text>
        </View>
        
        <TouchableOpacity style={styles.opportunityCard}>
          <View style={styles.opportunityIconContainer}>
            <TrendingUp size={24} color="#3B82F6" />
          </View>
          <View style={styles.opportunityContent}>
            <Text style={styles.opportunityTitle}>Consistent Reporting</Text>
            <Text style={styles.opportunityDescription}>
              Submit at least 3 reports this week to earn bonus tokens
            </Text>
          </View>
          <ArrowRight size={20} color="#6B7280" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.opportunityCard}>
          <View style={styles.opportunityIconContainer}>
            <Gift size={24} color="#3B82F6" />
          </View>
          <View style={styles.opportunityContent}>
            <Text style={styles.opportunityTitle}>First Report Bonus</Text>
            <Text style={styles.opportunityDescription}>
              Submit your first report to earn a welcome bonus
            </Text>
          </View>
          <ArrowRight size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  balanceCard: {
    backgroundColor: '#3B82F6',
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#E5E7EB',
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  balanceActions: {
    flexDirection: 'row',
  },
  balanceButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  balanceButtonText: {
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  balanceButtonSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  balanceButtonTextSecondary: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  tierCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tierIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  tierContent: {
    flex: 1,
  },
  tierTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  tierDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginRight: 8,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  opportunityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  opportunityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  opportunityContent: {
    flex: 1,
  },
  opportunityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  opportunityDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});