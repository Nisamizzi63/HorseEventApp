// components/SmallCard.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import palette from '../../colors/palette';

const SmallCard = ({ label, value, onPress, style }) => (
  <TouchableOpacity style={[styles.smallCard, style]} onPress={onPress}>
    <Text style={styles.smallCardLabel}>{label}</Text>
    <Text style={styles.smallCardValue}>{value}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  smallCard: {
    flex: 1,
    backgroundColor: palette.Transparent,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 18,
    justifyContent: 'center',
  },
  smallCardLabel: {
    color: palette.white,
    fontSize: 12,
  },
  smallCardValue: {
    color: palette.white,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
});

export default SmallCard;
