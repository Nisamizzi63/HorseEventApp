import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import palette from '../../colors/palette';

export default function RideProfileSection() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Rideprofil</Text>

      <Text style={styles.label}>Discipliner</Text>
      <Text>Dressur</Text>
      <Text>Spring</Text>

      <Text style={styles.label}>Certifikater</Text>
      <Text>Dressur niveau 1{'\n'}Basis førstehjælp hest</Text>

      <Text style={styles.label}>Erfaring</Text>
      <Text>2 år</Text>

      <Text style={styles.label}>Mål</Text>
      <Text>Deltage i stævner{'\n'}Forbedre springteknik</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: 'white', 
    padding: 14, 
    borderRadius: 16, 
    marginBottom: 12 },

  title: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 8 },

  label: { 
    marginTop: 12, 
    fontSize: 12, 
    color: palette.lightpurple },

  tagRow: { 
    flexDirection: 'row', 
    marginTop: 4 },

  tag: {
    backgroundColor: palette.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginRight: 6
  }
});
