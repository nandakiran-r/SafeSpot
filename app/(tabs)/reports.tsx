import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  Image
} from 'react-native';
import {
  PlusCircle,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Camera,
  ImageIcon,
  Send,
  X,
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

// Report item interface
interface ReportItem {
  type: string;
  status: string;
  date: string;
  location: string;
  description: string;
  id: string | number;
  reward?: number; // Optional property
}

// Mock data for reports - empty by default
const mockReports: ReportItem[] = [];

export default function ReportsScreen() {
  const [showForm, setShowForm] = useState(false);
  const [reports, setReports] = useState(mockReports);
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle form submission
  const handleSubmitReport = async (formData: FormData) => {
    try {
      // Here you would typically make an API call to your backend
      // For demo purposes, we'll just add a new report to the local state
      
      const newReport: ReportItem = {
        id: Date.now().toString(),
        type: 'Incident',
        status: 'pending',
        date: new Date().toLocaleDateString(),
        location: 'Current Location',
        description: formData.get('description') as string,
      };
      
      // Add the new report to the beginning of the list
      setReports([newReport, ...reports]);
      
      // Close the form after successful submission
      setShowForm(false);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error submitting report:', error);
      return Promise.reject(error);
    }
  };

  // Function to refresh reports
  const onRefresh = async () => {
    setRefreshing(true);
    // Here you would typically fetch the latest reports from your backend
    // For demo purposes, we'll just wait a second and then stop refreshing
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Empty state component
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <FileText size={48} color="#9CA3AF" />
      <Text style={styles.emptyStateTitle}>No reports yet</Text>
      <Text style={styles.emptyStateDescription}>
        Submit your first anonymous report to help make your community safer
      </Text>
      <TouchableOpacity 
        style={styles.emptyStateButton}
        onPress={() => setShowForm(true)}
      >
        <PlusCircle size={20} color="#FFFFFF" />
        <Text style={styles.emptyStateButtonText}>Submit New Report</Text>
      </TouchableOpacity>
    </View>
  );

  // Report item component
  const renderReportItem = ({ item }: { item: ReportItem }) => {
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
          <View
            style={[
              styles.statusContainer,
              { backgroundColor: `${statusColor}20` },
            ]}
          >
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

  // Main reports list view
  const ReportsListView = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Reports</Text>
        <TouchableOpacity 
          style={styles.newReportButton}
          onPress={() => setShowForm(true)}
        >
          <PlusCircle size={20} color="#FFFFFF" />
          <Text style={styles.newReportButtonText}>New Report</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={reports}
        renderItem={renderReportItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  );

  // Report form component
  const ReportFormView = () => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const takePhoto = async () => {
      try {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        
        if (permissionResult.granted === false) {
          alert('Camera access is needed to take photos');
          return;
        }
        
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.7,
        });
        
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      } catch (error) {
        alert('Failed to take photo');
        console.error(error);
      }
    };

    const pickImage = async () => {
      try {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
          alert('Gallery access is needed to select photos');
          return;
        }
        
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.7,
        });
        
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      } catch (error) {
        alert('Failed to pick image from gallery');
        console.error(error);
      }
    };

    const removeImage = () => {
      setImage(null);
    };

    const handleSubmit = async () => {
      if (!description.trim()) {
        alert('Please provide a description');
        return;
      }

      try {
        setIsSubmitting(true);
        
        // Create form data for submission
        const formData = new FormData();
        formData.append('description', description);
        
        if (image) {
          const filename = image.split('/').pop() || 'photo.jpg';
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : 'image/jpeg';
          
          formData.append('image', {
            uri: image,
            name: filename,
            type,
          } as any);
        }
        
        // Call the onSubmit function with the form data
        await handleSubmitReport(formData);
        
      } catch (error) {
        alert('Failed to submit report');
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setShowForm(false)}
          >
            <ArrowLeft size={24} color="#4B5563" />
          </TouchableOpacity>
          <Text style={styles.formTitle}>Submit New Report</Text>
          <View style={styles.backButtonPlaceholder} />
        </View>
        
        <View style={styles.formContent}>
          {/* Photo selection section */}
          <View style={styles.photoSection}>
            <Text style={styles.sectionTitle}>Add Photo (Optional)</Text>
            
            {image ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: image }} style={styles.imagePreview} />
                <TouchableOpacity 
                  style={styles.removeImageButton} 
                  onPress={removeImage}
                >
                  <X size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.photoOptions}>
                <TouchableOpacity 
                  style={styles.photoOptionButton} 
                  onPress={takePhoto}
                >
                  <Camera size={24} color="#3B82F6" />
                  <Text style={styles.photoOptionText}>Take Photo</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.photoOptionButton} 
                  onPress={pickImage}
                >
                  <ImageIcon size={24} color="#3B82F6" />
                  <Text style={styles.photoOptionText}>Gallery</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          {/* Description input */}
          <View style={styles.inputSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Describe the issue in detail..."
              multiline={true}
              value={description}
              onChangeText={setDescription}
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
          
          {/* Submit button */}
          <TouchableOpacity 
            style={[
              styles.submitButtonFull, 
              (!description.trim()) && styles.submitButtonDisabled
            ]} 
            onPress={handleSubmit}
            disabled={isSubmitting || !description.trim()}
          >
            <Send size={20} color="#FFFFFF" />
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {showForm ? <ReportFormView /> : <ReportsListView />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
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
    flexGrow: 1,
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
  
  // Form styles
  formContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  backButtonPlaceholder: {
    width: 32,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  formContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B5563',
    marginBottom: 8,
  },
  photoSection: {
    marginBottom: 24,
  },
  photoOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  photoOptionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    width: '45%',
    height: 100,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderStyle: 'dashed',
  },
  photoOptionText: {
    color: '#3B82F6',
    marginTop: 8,
    fontWeight: '500',
  },
  imagePreviewContainer: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 8,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
  },
  inputSection: {
    marginBottom: 24,
  },
  descriptionInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
  },
  submitButtonFull: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#93C5FD',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});