import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CreateHorseScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');

  const handleSave = () => {
    // Du kan senere integrere en API-kald her til Azure DB
    console.log('Gemmer hest:', { name, breed });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Opret Hest</Text>
      </View>

      {/* FORM */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Navn på hest</Text>
        <TextInput
          style={styles.input}
          placeholder="F.eks. Bella"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Race</Text>
        <TextInput
          style={styles.input}
          placeholder="F.eks. Dansk Varmblod"
          value={breed}
          onChangeText={setBreed}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Gem hest</Text>
        </TouchableOpacity>
      </View>

      {/* TILBAGEKNAP */}
      <View style={styles.backWrapper}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#1d4ed8" />
          <Text style={styles.backText}>Tilbage</Text>
        </TouchableOpacity>
      </View>

      {/* BUNDMENU */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="compass" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="cloud-upload" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#0881ebff',
    padding: 24,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
    marginBottom: 150, // for space above navbar
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  saveButton: {
    backgroundColor: '#7c3aed',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backWrapper: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#1d4ed8',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 25,
    backgroundColor: '#7c3aed',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});