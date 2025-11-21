// components/MenuCard.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import palette from '../../colors/palette';

const MenuCard = ({ title, subtitle, icon, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardIconWrapper}>{icon}</View>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardSubtitle}>{subtitle}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: palette.lightblue, 
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  cardIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.lightpink,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: palette.darkblue,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  cardSubtitle: {
    color: palette.mint,
    fontSize: 12,
  },
});

export default MenuCard;
