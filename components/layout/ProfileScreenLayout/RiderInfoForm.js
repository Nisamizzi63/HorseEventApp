import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import palette from '../../colors/palette';

export default function RiderInfoForm({ drfId, birthYear, setDrfId, setBirthYear, onSubmit }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Rytter information</Text>

      <TextInput
        style={styles.input}
        placeholder="DRF licens nummer"
        value={drfId}
        onChangeText={setDrfId}
      />

      <TextInput
        style={styles.input}
        placeholder="Rytterens fødselsår (fx 2000)"
        value={birthYear}
        onChangeText={setBirthYear}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Opret rytter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: palette.white, 
    borderRadius: 16, 
    padding: 14, 
    marginBottom: 12 
  },

  title: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 8 
  },

  input: {
    borderWidth: 1,
    borderColor: palette.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8
  },

  button: {
    backgroundColor: palette.purple,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center'
  },

  buttonText: { 
    color: 'white', 
    fontWeight: '600' 
  }
});
