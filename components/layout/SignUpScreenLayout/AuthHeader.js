import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../BackButton';
import palette from '../../colors/palette';

export default function AuthHeader({
  appName = 'HorseEvent',
  title,
  subtitle,
  showBack = false,
}) {
  return (
    <View style={styles.header}>
      {showBack && <BackButton />}
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
    backgroundColor: palette.darkblue,
  },
  appName: {
    color: palette.white,
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    color: palette.white,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
  },
  subtitle: {
    color: palette.lightblue,
    marginTop: 6,
    fontSize: 14,
  },
});
