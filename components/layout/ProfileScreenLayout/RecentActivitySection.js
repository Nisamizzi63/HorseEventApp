import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import palette from '../../colors/palette';

export default function RecentActivitySection({ activities }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>Seneste aktivitet</Text>
        <TouchableOpacity><Text style={styles.link}>Se alle</Text></TouchableOpacity>
      </View>

      {activities.map((a) => (
        <View key={a.title} style={styles.item}>
          <Text style={styles.activityTitle}>{a.title}</Text>
          <Text style={styles.date}>{a.date}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: palette.white, 
    borderRadius: 16, 
    padding: 14, 
    marginBottom: 12 },

  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' },

  title: { 
    fontSize: 16, 
    fontWeight: '600' },

  link: { 
    color: 
    palette.purple },
  item: { 
    marginTop: 6 },

  activityTitle: { 
    fontSize: 14, fontWeight: '600' },
    
  date: { 
    fontSize: 11, 
    color: palette.lightpurple}
});
