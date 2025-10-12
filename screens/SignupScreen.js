import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Fejl', 'Alle felter skal udfyldes.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Fejl', 'Kodeordene matcher ikke.');
      return;
    }
    if (!agree) {
      Alert.alert('Fejl', 'Du skal acceptere betingelserne.');
      return;
    }
    Alert.alert('Succes', 'Bruger oprettet (dummy).');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StævnePortalen</Text>
      <Text style={styles.subtitle}>Opret dig</Text>

      <TextInput
        style={styles.input}
        placeholder="your@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Kodeord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Bekræft kodeord"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <View style={styles.checkboxContainer}>
        <CheckBox value={agree} onValueChange={setAgree} />
        <Text style={styles.checkboxLabel}>
          Jeg accepterer <Text style={styles.link}>Vilkår</Text> og{' '}
          <Text style={styles.link}>Privatlivspolitik</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Opret</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>Tilbage</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 12,
    borderRadius: 8, marginBottom: 15
  },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkboxLabel: { marginLeft: 8, flex: 1 },
  link: { color: '#4285F4' },
  button: { backgroundColor: '#4285F4', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  back: { textAlign: 'center', color: '#A020F0', marginTop: 10 }
});