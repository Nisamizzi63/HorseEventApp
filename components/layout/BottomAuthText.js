import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../colors/colors';

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
    color: colors.grayMid,
  },
  link: {
    color: colors.purple,
    fontWeight: '600',
  },
});