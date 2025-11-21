import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, StyleSheet as RNStyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import palette from '../../colors/palette';

const SmallCard = ({ label, value, onPress, style }) => (
  <TouchableOpacity style={[styles.smallCard, style]} onPress={onPress}>
    
    <LinearGradient
      colors={[palette.lightblue, palette.darkblue]}
      start={{ x: 0, y: 2 }}
      end={{ x: 2, y: 3 }}
      style={styles.gradientBackground}
    />

    {/* Content */}
    <View style={styles.content}>
      <Text style={styles.smallCardLabel}>{label}</Text>
      <Text style={styles.smallCardValue}>{value}</Text>
    </View>

  </TouchableOpacity>
);

const styles = StyleSheet.create({
  smallCard: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',      // makes gradient follow rounded corners
    justifyContent: 'center',
  },
  gradientBackground: {
    ...RNStyleSheet.absoluteFillObject, // fills entire card without affecting layout
  },
  content: {
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  smallCardLabel: {
    color: palette.darkblue,
    fontSize: 12,
  },
  smallCardValue: {
    color: palette.darkblue,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
});

export default SmallCard;
