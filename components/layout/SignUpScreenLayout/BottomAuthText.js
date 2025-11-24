import React from 'react';
import { Text, StyleSheet } from 'react-native';
import palette from '../../colors/palette';

export default function BottomAuthText({ question, actionLabel, onPress }) {
  return (
    <Text style={styles.text}>
      {question}{' '}
      <Text style={styles.link} onPress={onPress}>
        {actionLabel}
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 13,
    color: palette.darkblue,
  },
  link: {
    color: palette.pink,
    fontWeight: '600',
  },
});