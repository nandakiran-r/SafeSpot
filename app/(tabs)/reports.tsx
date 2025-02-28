import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { PlusCircle, FileText, Clock, CheckCircle, XCircle } from 'lucide-react-native';

// Mock data for reports
const mockReports = [];

export default function ReportsScreen() {
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <FileText size={48} color="#9CA3AF" />
      <Text style={styles.emptyStateTitle}>No reports yet</Text>
      <Text style={styles.emptyStateDescription}>
        Submit your first anonymous report to help make your community safer
      </Text>
      <TouchableOpacity style={styles.emptyStateButton}>
        <PlusCircle size={20} color="#FFFFFF" />
        <Text style={styles.emptyStateButtonText}>Submit New Report</Text>
      </TouchableOpacity>
    </View>
  );

  const renderReportItem = ({ item }) => {
    let statusIcon;
    let statusColor;

    switch (item.status) {
      case 'pending':
        statusIcon = <Clock size={16} color="#F59E0B" />;
        statusColor = '#F59E0B';
        break;
      case 'verified':
        statusIcon = <CheckCircle size={16} color="#10B981" />;
        statusColor = '#10B981';
        break;
      case 'rejected':
        statusIcon = <XCircle size={16} color="#EF4444" />;
        statusColor = '#EF4444';
        break;
      default:
        statusIcon = <Clock size={16} color="#F59E0B" />;
        statusColor = '#F59E0B';
    }

    return (
      <TouchableOpacity style={styles.reportCard}>
        <View style={styles.reportHeader}>
          <Text style={styles.reportType}>{item.type}</Text>
          <View style={[styles.statusContainer, { backgroundColor: `${statusColor}20` }]}>
            {statusIcon}
            <Text style={[styles.statusText, { color: statusColor }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
        <Text style={styles.reportDate}>{item.date}</Text>
        <Text style={styles.reportLocation}>{item.location}</Text>
        <Text style={styles.reportDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.reportFooter}>
          <Text style={styles.reportId}>ID: {item.id}</Text>
          {item.reward ? (
            <View style={styles.rewardContainer}>
              <Text style={styles.rewardText}>{item.reward} tokens</Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Reports</Text>
        <TouchableOpacity style={styles.newReportButton}>
          <PlusCircle size={20} color="#FFFFFF" />
          <Text style={styles.newReportButtonText}>New Report</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockReports}
        renderItem={renderReportItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  newReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  newReportButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyStateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  reportDate: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  reportLocation: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  reportDescription: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  reportId: {
    fontSize: 12,
    color: '#6B7280',
  },
  rewardContainer: {
    backgroundColor: '#ECFDF5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  rewardText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
});