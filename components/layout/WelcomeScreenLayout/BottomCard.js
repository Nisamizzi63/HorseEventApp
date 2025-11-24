import React from 'react';
import { View, StyleSheet } from 'react-native';
import palette from '../../colors/palette';

export default function BottomCard({ children }) {
  console.log("Rendering BottomCard"); 
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    flex: 2,
    backgroundColor: palette.lightpink,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 50,
    alignItems: 'center',
    paddingBottom: 100,
  },
});
