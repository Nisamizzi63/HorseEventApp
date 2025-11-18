import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../colors/colors';

export default function AuthSwitch({
  leftLabel,
  rightLabel,
  active = 'right', // 'left' or 'right'
  onPressLeft,
  onPressRight,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tab,
          active === 'left' && styles.tabActive,
        ]}
        onPress={onPressLeft}
      >
        <Text
          style={[
            styles.text,
            active === 'left' ? styles.textActive : styles.textInactive,
          ]}
        >
          {leftLabel}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          active === 'right' && styles.tabActive,
        ]}
        onPress={onPressRight}
      >
        <Text
          style={[
            styles.text,
            active === 'right' ? styles.textActive : styles.textInactive,
          ]}
        >
          {rightLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F1F3F5',
    borderRadius: 999,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 999,
  },
  tabActive: {
    backgroundColor: colors.teal,
  },
  text: {
    fontSize: 14,
  },
  textInactive: {
    color: colors.grayMid,
  },
  textActive: {
    color: colors.white,
    fontWeight: '600',
  },
});
