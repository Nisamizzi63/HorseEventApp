import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BottomNavbar() {
  const navigation = useNavigation();

  return (
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
      <TouchableOpacity onPress={() => navigation.navigate('Profil')}>
        <Ionicons name="person" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 25,
    backgroundColor: '#b896f3ff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});