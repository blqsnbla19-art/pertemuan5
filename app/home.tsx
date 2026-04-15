import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Home() {
  const { userName } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Selamat Datang, 👋</Text>
      <Text style={styles.name}>{userName || 'User'}!</Text>
      <TouchableOpacity style={styles.logout} onPress={() => router.replace('/')}>
        <Text style={{color: 'red'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  welcome: { fontSize: 18, color: '#666' },
  name: { fontSize: 32, fontWeight: 'bold', color: '#007AFF' },
  logout: { marginTop: 50, padding: 10, borderBottomWidth: 1, borderBottomColor: 'red' }
});