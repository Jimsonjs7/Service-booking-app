import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
  TextInput, StyleSheet, ActivityIndicator, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface Category {
  id: number;
  name: string;
  iconUrl: string;
  description: string;
}

interface Tasker {
  id: number;
  name: string;
  profilePicUrl?: string;
  rating?: number;
  bio?: string;
  categoryName?: string;
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [topTaskers, setTopTaskers] = useState<Tasker[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingTopTaskers, setLoadingTopTaskers] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
     router.replace('auth/signin')

    } catch (err) {
      Alert.alert('Logout Error', 'Unable to log out.');
      console.error('Logout failed:', err);
    }
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(err => console.error('Error fetching categories:', err))
      .finally(() => setLoadingCategories(false));

    fetch('http://localhost:8080/api/taskers/top')
      .then(res => res.json())
      .then(setTopTaskers)
      .catch(err => console.error('Error fetching top taskers:', err))
      .finally(() => setLoadingTopTaskers(false));
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      const trimmed = searchQuery.trim();
      if (trimmed.length > 0) {
        fetch(`http://localhost:8080/api/categories/search?query=${encodeURIComponent(trimmed)}`)
          .then(res => res.json())
          .then(setFilteredCategories)
          .catch(err => console.error('Search failed:', err));
      } else {
        setFilteredCategories([]);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  const navigateToTaskersList = (categoryName: string) => {
    if (!categoryName) return;
    router.push({
      pathname: '/main/tasker',
      params: { category: categoryName }
    });
  };

  const handleCategorySuggestionPress = (categoryName: string) => {
    setSearchQuery(categoryName);
    navigateToTaskersList(categoryName);
    setFilteredCategories([]);
  };

  const renderCategorySuggestion = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handleCategorySuggestionPress(item.name)}
    >
      <Image source={{ uri: item.iconUrl }} style={styles.suggestionIcon} />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigateToTaskersList(item.name)}
    >
      <Image source={{ uri: item.iconUrl }} style={styles.icon} />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderTaskerItem = ({ item }: { item: Tasker }) => (
    <TouchableOpacity
      style={styles.taskerCard}
      onPress={() =>
        router.push({
          pathname: '/main/tasker',
          params: {
            id: item.id.toString(),
            name: item.name,
            profilePicUrl: item.profilePicUrl || '',
            rating: item.rating?.toString() || '',
            bio: item.bio || '',
            categoryName: item.categoryName || ''
          }
        })
      }
    >
      <Image
        source={{ uri: item.profilePicUrl || 'https://via.placeholder.com/60' }}
        style={styles.avatar}
      />
      <Text style={styles.taskerName}>{item.name}</Text>
      <Text style={styles.rating}>⭐ {item.rating?.toFixed(1) || 'No rating'}</Text>
      {item.categoryName && <Text style={styles.role}>{item.categoryName}</Text>}
      {item.bio && <Text style={styles.bio} numberOfLines={2}>{item.bio}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Welcome 👋</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Search services..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />

      {filteredCategories.length > 0 && (
        <FlatList
          data={filteredCategories}
          keyExtractor={(item) => item.id.toString()}
          style={styles.dropdown}
          renderItem={renderCategorySuggestion}
        />
      )}

      <Text style={styles.sectionTitle}>Popular Categories</Text>
      {loadingCategories ? (
        <ActivityIndicator size="small" color="#007AFF" />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategoryItem}
        />
      )}

      <Text style={styles.sectionTitle}>Top Taskers</Text>
      {loadingTopTaskers ? (
        <ActivityIndicator size="small" color="#007AFF" />
      ) : topTaskers.length > 0 ? (
        <FlatList
          data={topTaskers}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderTaskerItem}
        />
      ) : (
        <Text style={styles.noTaskers}>No top taskers available yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  header: { fontSize: 28, fontWeight: '600', marginBottom: 16 },
  logout: { fontSize: 16, color: 'blue', textDecorationLine: 'underline', marginBottom: 16 },
  searchBar: {
    padding: 12, borderWidth: 1, borderColor: '#ccc',
    borderRadius: 8, marginBottom: 8,
  },
  dropdown: {
    maxHeight: 150, backgroundColor: '#fff', borderColor: '#ccc',
    borderWidth: 1, borderRadius: 8, marginBottom: 12, padding: 8,
  },
  dropdownItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  suggestionIcon: { width: 24, height: 24, marginRight: 8 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 12 },
  categoryCard: {
    alignItems: 'center', marginRight: 12, padding: 8,
    borderRadius: 8, backgroundColor: '#f4f4f4', width: 100,
  },
  icon: { width: 50, height: 50, marginBottom: 8 },
  taskerCard: {
    alignItems: 'center', marginRight: 16, padding: 10,
    borderRadius: 8, backgroundColor: '#f9f9f9', width: 140,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginBottom: 6 },
  taskerName: { fontWeight: '600', fontSize: 14, textAlign: 'center' },
  rating: { fontSize: 12, color: '#777' },
  role: { fontSize: 12, color: '#555', fontStyle: 'italic', marginTop: 2, textAlign: 'center' },
    bio: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  noTaskers: {
    fontStyle: 'italic',
    color: '#777',
    marginTop: 12,
    textAlign: 'center',
  },
});
