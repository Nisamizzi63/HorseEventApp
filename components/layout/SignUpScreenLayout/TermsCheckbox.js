import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';
import palette from '../../colors/palette';

export default function TermsCheckbox({ value, onValueChange }) {
  return (
    <View style={styles.row}>
      <CheckBox
        value={value}
        onValueChange={onValueChange}
        color={value ? palette.darkblue : undefined}
      />
      <Text style={styles.label}>
        Jeg accepterer <Text style={styles.link}>Vilkår</Text> og{' '}
        <Text style={styles.link}>Privatlivspolitik</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  label: {
    marginLeft: 8,
    flex: 1,
    fontSize: 12,
    color: palette.darkblue,
  },
  link: {
    color: palette.pink,
    fontWeight: '600',
  },
});