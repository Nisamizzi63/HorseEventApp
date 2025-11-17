import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <View style={styles.backWrapper}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={20} color="#1d4ed8" />
        <Text style={styles.backText}>Tilbage</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    right: 20,
    bottom: -20,
    flexDirection: 'row',  //arrow placement
    backgroundColor: 'transparent',
  },

  backText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#1d4ed8',
    fontWeight: '500',
  },
});