// components/BottomCard.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../colors/colors';

export default function BottomCard({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    flex: 3,
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 35,
    alignItems: 'center',
    paddingBottom: 100,
  },
});