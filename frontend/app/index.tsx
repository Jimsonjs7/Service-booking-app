// app/index.tsx
import { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      setTimeout(() => {
        if (userData) {
        router.replace('/main/home');// 👈 Redirect to home if logged in
        } else {
          router.replace('/auth/signup'); // 👈 Otherwise go to SignUp
        }
      }, 200); // ⏳ Delay for splash effect
    };

    redirectUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🚀</Text>
      <Text style={styles.title}>Welcome to SwiftServe</Text>
      <ActivityIndicator size="small" color="#007AFF" style={{ marginTop: 16 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff',
  },
  logo: { fontSize: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 16 },
});
