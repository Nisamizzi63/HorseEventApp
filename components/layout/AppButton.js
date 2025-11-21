// components/AppButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import palette from '../colors/palette'; // updated import

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

  // Primary button
  primary: {
    backgroundColor: palette.cyanSoft,
  },

  // Secondary button
  secondary: {
    backgroundColor: palette.aqua,
  },

  // Outline button
  outline: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.aqua,
    marginTop: 8,
  },

  textFilled: {
    color: palette.white,
    fontSize: 16,
    fontWeight: '600',
  },

  textOutline: {
    color: palette.cyanSoft, 
    fontSize: 16,
    fontWeight: '500',
  },
});
