import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import palette from '../../colors/palette';

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
        placeholderTextColor={palette.lightblue}
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
    color: palette.darkblue,
    marginBottom: 6,
  },
  input: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.white,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 15,
  },
});