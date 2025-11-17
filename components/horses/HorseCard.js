import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function HorseCard({ horse, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <FontAwesome5 name="horse" size={32} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{horse.name}</Text>
        <Text style={styles.sub}>UELN: {horse.ueln || '—'}</Text>
        <Text style={styles.sub}>
          Højde: {horse.height ? `${horse.height} cm` : '—'}
        </Text>
        <Text style={styles.sub}>Fødselsår: {horse.birthYear || '—'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  iconWrapper: { marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  info: { flex: 1 },
  name: { fontWeight: 'bold', fontSize: 18, marginBottom: 4 },
  sub: { fontSize: 14, color: '#555' },
});