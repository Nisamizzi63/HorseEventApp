import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import palette from '../../colors/palette';

export default function StatsSection({ stats }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Hurtige stats</Text>

      <View style={styles.grid}>
        {stats.map((s) => (
          <View key={s.label} style={styles.item}>
            <Text style={styles.value}>{s.value}</Text>
            <Text style={styles.label}>{s.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: 'white', 
    borderRadius: 16, 
    padding: 14, 
    marginBottom: 12 
  },

  title: { fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 8 
  },

  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },

  item: {
    width: '48%',
    backgroundColor: palette.white,
    borderRadius: 12,
    padding: 10,
    marginBottom: 8

  },

  value: { 
    fontSize: 16, 
    fontWeight: '700' 
  },

  label: { 
    fontSize: 11, 
    color: palette.lightpurple, 
    marginTop: 2 
  }

});
