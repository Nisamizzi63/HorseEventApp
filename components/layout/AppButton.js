// components/AppButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../colors/colors';

export default function AppButton({ title, onPress, variant = 'primary' }) {
  const styleMap = {
    primary: styles.primary,
    secondary: styles.secondary,
    outline: styles.outline,
  };

  const textColor =
    variant === 'outline' ? styles.textOutline : styles.textFilled;

  return (
    <TouchableOpacity style={[styles.base, styleMap[variant]]} onPress={onPress}>
      <Text style={textColor}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },

  primary: {
    backgroundColor: colors.teal,
  },

  secondary: {
    backgroundColor: colors.purple,
  },

  outline: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grayBorder,
    marginTop: 8,
  },

  textFilled: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },

  textOutline: {
    color: '#444',
    fontSize: 16,
    fontWeight: '500',
  },
});