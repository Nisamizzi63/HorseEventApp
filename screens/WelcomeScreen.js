import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/horse.png')} style={styles.image} />

      <Text style={styles.title}>
        Velkommen til{'\n'}
        <Text style={{ fontWeight: 'bold' }}>StævnePortalen</Text>
      </Text>

      <TouchableOpacity style={styles.buttonBlue} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonPurple} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonGuest} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonGuestText}>Continue as Guest</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        By continuing, you agree to our Terms of Service and Privacy Policy
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20
  },
  buttonBlue: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginBottom: 10
  },
  buttonPurple: {
    backgroundColor: '#A020F0',
    padding: 15,
    borderRadius: 10,
    width: '80%'
  },
  buttonGuest: {
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    width: '80%'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16
  },
  buttonGuestText: {
    textAlign: 'center',
    color: '#444',
    fontSize: 16
  },
  terms: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#555'
  }
});

