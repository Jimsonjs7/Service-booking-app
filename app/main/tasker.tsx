        
        
        
  import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, StyleSheet, ActivityIndicator,
  TouchableOpacity, ScrollView, Alert, TextInput
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface Tasker {
  id: number;
  name: string;
  profilePicUrl?: string;
  rating?: number;
  bio?: string;
  categoryName?: string;
  asset_type?: string;
  asset_model?: string;
  asset_color?: string;
  asset_identifier?: string;
  asset_summary?: string;
}

export default function TaskersPage() {
  const params = useLocalSearchParams();
  const { category } = params;
  const router = useRouter();
  const [taskers, setTaskers] = useState<Tasker[]>([]);
  const [selectedTasker, setSelectedTasker] = useState<Tasker | null>(null);
  const [tripHistory, setTripHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [instructions, setInstructions] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  useEffect(() => {
    if (params.id && params.name) {
      const tasker: Tasker = {
        id: parseInt(params.id as string),
        name: params.name as string,
        profilePicUrl: params.profilePicUrl as string,
        rating: parseFloat(params.rating as string),
        bio: params.bio as string,
        categoryName: params.categoryName as string,
      };
      setSelectedTasker(tasker);
      setLoading(false);
    } else if (category) {
      setLoading(true);
      setError(null);
      fetch(`http://localhost:8080/api/categories/taskers?category=${encodeURIComponent(category as string)}`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then((data: Tasker[]) => setTaskers(data))
        .catch(err => {
          console.error(`Error fetching taskers:`, err);
          setError('Unable to load taskers. Please try again later.');
        })
        .finally(() => setLoading(false));
    } else {
      setTaskers([]);
      setError('No category specified.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedTasker) {
      fetch(`http://localhost:8080/api/taskers/${selectedTasker.id}/trips`)
        .then(res => {
          if (!res.ok) throw new Error(`Trip fetch failed`);
          return res.json();
        })
        .then((data: string[]) => setTripHistory(data))
        .catch(() => setTripHistory([]));
    }
  }, [selectedTasker]);

  const handleReportIssue = () => {
    if (!selectedTasker) return;
    fetch('http://localhost:8080/api/issues/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        taskerId: selectedTasker.id,
        issueDescription: 'Reported via frontend UI'
      })
    })
      .then(res => {
        if (res.ok) {
          Alert.alert('✅ Issue Reported', `Your report for ${selectedTasker.name} was submitted.`);
        } else {
          res.text().then(msg => Alert.alert('❌ Failed', msg));
        }
      })
      .catch(err => Alert.alert('Error', err.message));
  };

  const handleBookingSubmit = () => {
    if (!selectedTasker || !pickupLocation || !scheduledTime) {
      Alert.alert('Missing Info', 'Pickup location and time are required.');
      return;
    }

    fetch('http://localhost:8080/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 1, // Replace with dynamic user ID
        taskerId: selectedTasker.id,
        category: selectedTasker.categoryName,
        pickupLocation,
        dropLocation,
        instructions,
        scheduledTime
      })
    })
      .then(res => {
        if (res.ok) {
          Alert.alert('✅ Booking Confirmed', `You booked ${selectedTasker.name}`);
          setShowBookingForm(false);
          setPickupLocation('');
          setDropLocation('');
          setInstructions('');
          setScheduledTime('');
        } else {
          res.text().then(msg => Alert.alert('❌ Booking Failed', msg));
        }
      })
      .catch(err => Alert.alert('Error', err.message));
  };

  const renderTaskerItem = ({ item }: { item: Tasker }) => (
    <View style={styles.taskerCard}>
      <Image source={{ uri: item.profilePicUrl || 'https://via.placeholder.com/100' }} style={styles.avatar} />
      <Text style={styles.taskerName}>{item.name}</Text>
      <Text style={styles.rating}>⭐ {item.rating?.toFixed(1) || 'Not rated yet'}</Text>
      <Text style={styles.role}>{item.categoryName || 'Unknown category'}</Text>
      <Text style={styles.bio}>{item.bio || 'No bio available.'}</Text>
      <TouchableOpacity style={styles.viewProfileButton} onPress={() => setSelectedTasker(item)}>
        <Text style={styles.viewProfileButtonText}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSelectedProfile = () => (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.taskerCard}>
        <Image source={{ uri: selectedTasker?.profilePicUrl || 'https://via.placeholder.com/100' }} style={styles.avatar} />
        <Text style={styles.taskerName}>{selectedTasker?.name}</Text>
        <Text style={styles.rating}>⭐ {selectedTasker?.rating?.toFixed(1) || 'Not rated yet'}</Text>
        <Text style={styles.role}>{selectedTasker?.categoryName || 'Unknown Category'}</Text>
        <Text style={styles.bio}>{selectedTasker?.bio || 'No bio available.'}</Text>

        <View style={styles.assetSection}>
          <Text style={styles.profileHeading}>Asset Info</Text>
          <Text style={styles.profileText}>Type: {selectedTasker?.asset_type || '—'}</Text>
          <Text style={styles.profileText}>Model: {selectedTasker?.asset_model || '—'}</Text>
          <Text style={styles.profileText}>Color: {selectedTasker?.asset_color || '—'}</Text>
          <Text style={styles.profileText}>Identifier: {selectedTasker?.asset_identifier || '—'}</Text>
          <Text style={styles.profileText}>Summary: {selectedTasker?.asset_summary || '—'}</Text>
        </View>

        <View style={styles.tripSection}>
          <Text style={styles.profileHeading}>Trip History</Text>
          {tripHistory.length > 0 ? (
            tripHistory.map((trip, index) => (
              <Text key={index} style={styles.profileText}>• {trip}</Text>
            ))
          ) : (
            <Text style={styles.profileText}>No trips available.</Text>
          )}
        </View>

        {showBookingForm ? (
          <View style={styles.bookingForm}>
            <Text style={styles.profileHeading}>Book This Tasker</Text>
            <TextInput
              placeholder="Pickup Location"
              value={pickupLocation}
              onChangeText={setPickupLocation}
              style={styles.input}
            />
            <TextInput
              placeholder="Drop Location"
              value={dropLocation}
              onChangeText={setDropLocation}
              style={styles.input}
            />
            <TextInput
              placeholder="Scheduled Time (YYYY-MM-DD HH:MM:SS)"
              value={scheduledTime}
              onChangeText={setScheduledTime}
              style={styles.input}
            />
            <TextInput
              placeholder="Special Instructions"
              value={instructions}
              onChangeText={setInstructions}
              style={[styles.input, { height: 80 }]}
              multiline
            />
            <TouchableOpacity style={styles.confirmButton} onPress={handleBookingSubmit}>
              <Text style={styles.confirmText}>Confirm Booking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowBookingForm(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.bookNowButton} onPress={() => setShowBookingForm(true)}>
            <Text style={styles.bookNowText}>Book Now</Text>
          </TouchableOpacity>
        )}      
        <TouchableOpacity style={styles.reportButton} onPress={handleReportIssue}>
          <Text style={styles.reportButtonText}>Report Issue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewProfileButton} onPress={() => setSelectedTasker(null)}>
          <Text style={styles.viewProfileButtonText}>Back to List</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (selectedTasker ? setSelectedTasker(null) : router.back())} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {selectedTasker ? 'Tasker Profile' : category ? `${category} Taskers` : 'Taskers'}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loadingIndicator} />
      ) : error && taskers.length === 0 ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : selectedTasker ? (
        renderSelectedProfile()
      ) : taskers.length > 0 ? (
        <FlatList
          data={taskers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTaskerItem}
          contentContainerStyle={styles.listContentContainer}
        />
      ) : (
        <Text style={styles.noTaskersText}>
          {category ? `No taskers found for "${category}".` : 'No taskers available.'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  scrollContainer: { paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 20 },
  backButton: { padding: 10, marginRight: 10 },
  backButtonText: { fontSize: 18, color: '#007AFF' },
  title: { fontSize: 24, fontWeight: 'bold', flex: 1 },
  loadingIndicator: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginTop: 20 },
  listContentContainer: { paddingBottom: 20 },
  taskerCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  taskerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  rating: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 5,
  },
  role: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 5,
    textAlign: 'center',
  },
  bio: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  viewProfileButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  viewProfileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bookNowButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 20,
  },
  bookNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  reportButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 10,
  },
  reportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  profileHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 6,
    textAlign: 'center',
  },
  profileText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 4,
  },
  assetSection: {
    marginTop: 10,
    backgroundColor: '#f0f8ff',
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  tripSection: {
    marginTop: 10,
    backgroundColor: '#fff8e1',
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  noTaskersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
  bookingForm: {
    marginTop: 20,
    backgroundColor: '#e6f7ff',
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    fontSize: 14,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 10,
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#cccccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 10,
  },
  cancelText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});
