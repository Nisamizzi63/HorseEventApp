import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import CheckBox from 'expo-checkbox';

const API_BASE_URL = "http://10.0.0.7:5068";
const CREATE_USER_URL = `${API_BASE_URL}/api/User`;

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async () => {
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

    // Simple email check (optional)
    if (!email.includes('@')) {
      Alert.alert('Fejl', 'Indtast en gyldig email.');
      return;
    }

    setIsSubmitting(true);

    try {
      // You can adjust this to match your CreateUserRequest model
      const body = {
        username: email.split('@')[0], // or add a separate username field
        email: email,
        password: password
      };

      const response = await fetch(CREATE_USER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        // Try to read error message from backend
        let message = 'Kunne ikke oprette brugeren.';
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            message = errorData.message;
          }
        } catch (_) {
          // ignore JSON parse error, keep default message
        }

        Alert.alert('Fejl', message);
        return;
      }

      const data = await response.json();
      console.log('User created:', data);

      Alert.alert('Succes', 'Bruger oprettet!', [
        {
          text: 'OK',
          onPress: () => {
            // Gå til login (eller hovedskærm hvis du vil auto-logge ind)
            navigation.navigate('Login'); // skift til dit rigtige route-navn
          },
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Fejl', 'Der opstod en fejl ved forbindelse til serveren.');
    } finally {
      setIsSubmitting(false);
    }
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
        autoCapitalize="none"
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

      <TouchableOpacity
        style={[styles.button, isSubmitting && { opacity: 0.6 }]}
        onPress={handleSignup}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>Opret</Text>
        )}
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
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkboxLabel: { marginLeft: 8, flex: 1 },
  link: { color: '#4285F4' },
  button: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  back: { textAlign: 'center', color: '#A020F0', marginTop: 10 },
});