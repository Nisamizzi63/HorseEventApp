import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import palette from '../colors/palette';

export default function EventCard({ event, onPress }) {
  if (!event) return null;

  const dateText = event.startDate
    ? new Date(event.startDate).toLocaleDateString()
    : 'Dato ukendt';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.left}>
        <Text style={styles.title}>{event.name}</Text>
        {event.location ? (
          <Text style={styles.location}>{event.location}</Text>
        ) : null}
      </View>

      <View style={styles.right}>
        <Text style={styles.date}>{dateText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 6,
    marginVertical: 4,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexShrink: 1,
    paddingRight: 10,
  },
  right: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.darkblue,
  },
  location: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  date: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '500',
  },
});