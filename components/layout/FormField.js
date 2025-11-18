import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../colors/colors';

export default function FormField({
  label,
  style,
  ...textInputProps
}) {
  return (
    <View style={[styles.field, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.grayBorder}
        {...textInputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: colors.grayMid,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F7F8FA',
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 15,
  },
});