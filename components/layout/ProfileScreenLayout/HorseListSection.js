import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import palette from '../../colors/palette';

export default function HorseListSection({ horses, onSeeAll }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>Mine heste</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.link}>Se alle</Text>
        </TouchableOpacity>
      </View>

      {horses.map((horse) => (
        <View key={horse.name} style={styles.item}>
          <View style={styles.imagePlaceholder} />
          <View>
            <Text style={styles.name}>{horse.name}</Text>
            <Text style={styles.details}>{horse.details}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: palette.white, borderRadius: 16, padding: 14, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontSize: 16, fontWeight: '600' },
  link: { color: palette.purple },
  item: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },

  // Existing image style
  image: { 
    width: 44, 
    height: 44, 
    borderRadius: 10, 
    marginRight: 10 
  },

  // New placeholder style
  imagePlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#ddd',
    marginRight: 10,
  },

  name: { 
    fontSize: 14, 
    fontWeight: '600' 
  },

  details: { 
    fontSize: 12, 
    color: palette.lightpurple 
  },
});
