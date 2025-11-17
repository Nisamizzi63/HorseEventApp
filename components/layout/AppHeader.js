import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function AppHeader({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3c95e3ff',
    paddingTop: Platform.OS === 'ios' ? 1 : 20, // Fix for iPhone notch
    paddingBottom: 15,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
});