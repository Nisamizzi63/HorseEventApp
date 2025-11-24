import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import palette from '../../colors/palette';

export default function HeaderImage({ source }) {
  return (
    <View style={styles.header}>
      <Image
        source={source}
        style={[styles.image, { tintColor: palette.lightblue }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
  },
});
