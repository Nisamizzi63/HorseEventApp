// components/MenuCard.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, StyleSheet as RNStyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import palette from '../../colors/palette';

const MenuCard = ({ title, subtitle, icon, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
     <LinearGradient
      colors={[palette.lightblue, palette.darkblue]}
      start={{ x: 0, y: 2 }}
      end={{ x: 2, y: 3 }}
      style={styles.gradientBackground}
    />

    {/* Content on top of gradient */}
    <View style={styles.cardContent}>
      <View style={styles.cardIconWrapper}>{icon}</View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden', // so gradient follows rounded corners
    position: 'relative',
  },
  gradientBackground: {
    ...RNStyleSheet.absoluteFillObject, // fill entire card
  },
  cardContent: {
    paddingVertical: 18,
    paddingHorizontal: 14,
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
    color: palette.darkblue,
    fontSize: 12,
  },
});

export default MenuCard;
