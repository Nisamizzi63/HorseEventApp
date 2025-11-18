import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../colors/colors';
import BackButton from './BackButton';          // 👈 IMPORTANT path

export default function AuthHeader({
  appName = 'HorseEvent',
  title,
  subtitle,
  showBack = false,
}) {
  return (
    <View style={styles.header}>
      {showBack && <BackButton />}              {/* 👈 renders button */}
      <Text style={styles.appName}>{appName}</Text>
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: colors.teal,
  },
  appName: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
    fontSize: 14,
  },
});
