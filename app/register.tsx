import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ nama: '', email: '', phone: '', pass: '', confirmPass: '' });

  const handleRegister = () => {
    const { nama, email, phone, pass, confirmPass } = form;

    // 🛡️ Security Logic 1: Validasi Email (RegEx)
    if (!/\S+@\S+\.\S+/.test(email)) return Alert.alert('Security Alert', 'Email tidak valid!');

    // 🛡️ Security Logic 2: Validasi Phone (Min 10 Digit)
    if (phone.length < 10) return Alert.alert('Security Alert', 'Nomor HP minimal 10 digit!');

    // 🛡️ Security Logic 3: Match Check Password
    if (pass !== confirmPass) return Alert.alert('Security Alert', 'Password tidak cocok!');

    if (!nama || !pass) return Alert.alert('Error', 'Semua kolom wajib diisi!');

    Alert.alert('Success', 'Akun berhasil dibuat!');
    router.replace({ pathname: '/home', params: { userName: nama } });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Daftar Akun Baru</Text>
          <TextInput style={styles.input} placeholder="Nama Lengkap" onChangeText={(v) => setForm({...form, nama: v})} />
          <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" onChangeText={(v) => setForm({...form, email: v})} />
          <TextInput style={styles.input} placeholder="Nomor HP" keyboardType="numeric" onChangeText={(v) => setForm({...form, phone: v})} />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(v) => setForm({...form, pass: v})} />
          <TextInput style={styles.input} placeholder="Konfirmasi Password" secureTextEntry onChangeText={(v) => setForm({...form, confirmPass: v})} />
          
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Daftar Sekarang</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: 'white', padding: 25, borderRadius: 15, elevation: 5 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12, backgroundColor: '#fafafa' },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});