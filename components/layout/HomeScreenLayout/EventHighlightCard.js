// components/EventHighlightCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StyleSheet as RNStyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import palette from '../../colors/palette';

const EventHighlightCard = ({ title, date, onPress }) => (
  <TouchableOpacity style={styles.eventCard} onPress={onPress}>
    
    {/* Gradient background */}
    <LinearGradient
      colors={[palette.darkblue, palette.lightblue]}
      start={{ x: 0, y: 2 }}
      end={{ x: 2, y: 3 }}
      style={styles.gradientBackground}
    />

    {/* Card Content */}
    <View style={styles.contentWrapper}>
      <View style={styles.eventImageWrapper}>
        <Image
          source={require('../../../assets/KidsRacing.jpg')}
          style={styles.eventImage}
        />
      </View>

      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventDate}>{date}</Text>
      </View>
    </View>

  </TouchableOpacity>
);

const styles = StyleSheet.create({
  eventCard: {
    borderRadius: 20,
    padding: 12,
    marginTop: 20,
    overflow: 'hidden',            // Makes gradient follow rounded corners
    position: 'relative',
  },
  gradientBackground: {
    ...RNStyleSheet.absoluteFillObject, // Full background layer
  },
  contentWrapper: {
    zIndex: 2,                     // Ensures content is ABOVE gradient
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
    color: palette.white,                // White text to fit gradient
    fontSize: 16,
    fontWeight: '600',
  },
  eventDate: {
    color: palette.white,
    fontSize: 13,
    marginTop: 4,
  },
});

export default EventHighlightCard;
