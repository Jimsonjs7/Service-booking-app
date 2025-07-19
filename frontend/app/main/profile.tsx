import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [user, setUser] = useState({
    id: '',
    email: '',
    name: '',
    profilePicUrl: '',
  });
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) throw new Error('Token not found');
      const res = await fetch('http://192.168.1.100:8080/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('User fetch failed');

      const data = await res.json();
      console.log('Fetched user:', data);
      setUser(data);
      setName(data.name || '');
    } catch (err) {
      console.error('Error fetching user:', err);
      Alert.alert('Error', 'Unable to fetch user info');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEdit = async () => {
    try {
      setSaving(true);
      const token = await AsyncStorage.getItem('authToken');
      const res = await fetch('http://192.168.1.100:8080/api/users/update-username', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: name }),
      });

      const msg = await res.text();
      if (res.ok) {
        Alert.alert('✅ Success', msg);
        setEditing(false);
        fetchUser();
      } else {
        Alert.alert('⚠️ Error', msg);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to update username');
    } finally {
      setSaving(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      const filename = localUri.split('/').pop()!;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append('file', {
        uri: localUri,
        name: filename,
        type,
      } as any);
      formData.append('userId', String(user?.id));

      try {
        setUploading(true);
        const uploadRes = await fetch('http://192.168.1.100:8080/api/users/upload-profile-pic', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
        const imageUrl = await uploadRes.text();
        if (uploadRes.ok) {
          Alert.alert('✅ Upload successful');
          fetchUser();
        } else {
          Alert.alert('Upload failed', imageUrl);
        }
      } catch (e) {
        console.error('Upload error:', e);
        Alert.alert('Upload error');
      } finally {
        setUploading(false);
      }
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#007AFF" />;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{
            uri: user?.profilePicUrl || 'https://www.w3schools.com/howto/img_avatar.png',
          }}
          style={styles.avatar}
        />
        <Text style={styles.changeText}>
          {uploading ? 'Uploading...' : 'Tap to change'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.readOnlyField}>{user?.email || '-'}</Text>

      <Text style={styles.label}>Username</Text>
      {editing ? (
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Enter new username"
        />
      ) : (
        <Text style={styles.readOnlyField}>{user?.name || '-'}</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={editing ? handleEdit : () => setEditing(true)}
        disabled={saving}
      >
        <Text style={styles.buttonText}>
          {saving ? 'Saving...' : editing ? 'Save Changes' : 'Edit Profile'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  changeText: {
    textAlign: 'center',
    color: 'blue',
    marginBottom: 20,
    fontSize: 14,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16,
  },
  readOnlyField: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 14,
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
