import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Platform } from 'react-native';
import colors from '../colors/colors';

export default function AuthCard({ children }) {
  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.card}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  card: {
    flexGrow: 1,
    padding: 24,
  },
});
