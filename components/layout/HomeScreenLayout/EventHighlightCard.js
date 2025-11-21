// components/EventHighlightCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import palette from '../../colors/palette';


const EventHighlightCard = ({ title, date, onPress }) => (
  <TouchableOpacity style={styles.eventCard} onPress={onPress}>
    <View style={styles.eventImageWrapper}>
      <Image
        source={require('../../../assets/KidsRacing.jpg')} // just adjust path if needed
        style={styles.eventImage}
      />
    </View>
    <View style={styles.eventContent}>
      <Text style={styles.eventTitle}>{title}</Text>
      <Text style={styles.eventDate}>{date}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: palette.lightblue,
    borderRadius: 20,
    padding: 12,
    marginTop: 20,
  },
  eventImageWrapper: {
    width: '100%',
    height: 230,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  eventContent: {
    marginBottom: 8,
  },
  eventTitle: {
    color: palette.darkblue,
    fontSize: 16,
    fontWeight: '600',
  },
  eventDate: {
    color: palette.mint,
    fontSize: 13,
    marginTop: 4,
  },
});

export default EventHighlightCard;
