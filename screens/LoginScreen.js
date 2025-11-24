import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Fejl', 'Udfyld både brugernavn og kodeord.');
      return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/User/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Forkert brugernavn eller kodeord');
      }

      const user = await response.json();

      setUser({
        id: user.id,
        name: user.userName,
        email: user.email,
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (err) {
      Alert.alert('Login fejlede', err.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top dark patterned background */}
      <View style={styles.header}>
      <Image
        source={require('../assets/ChildRiding.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      </View>

      

      {/* White rounded card */}
      <View style={styles.card}>
        <Text style={styles.title}>Lad os starte!</Text>

        <TextInput
          style={styles.input}
          placeholder="Brugernavn"
          placeholderTextColor="#7A7A7A"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Kodeord"
          placeholderTextColor="#7A7A7A"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Tilbage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  
  container: {
    flex: 1,
    backgroundColor: '#54a49bff', 
  },

  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 200,
    height: 400,
  },

  card: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    marginBottom: 25,
    textAlign: 'center',
  },

  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  
  button: {
    backgroundColor: '#dd94f5ff', 
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },

  backText: {
    color: '#549F93',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
  },
});
