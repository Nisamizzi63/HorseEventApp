// components/chat/ChatbotHeader.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import palette from '../../colors/palette';

export default function ChatbotHeader() {
  return (
    <LinearGradient
      colors={[palette.lightpink, palette.lightblue]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.fancyHeader}
    >
      <View style={styles.fancyCenter}>
        <Text style={styles.fancyTitle}>Chatbotten</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fancyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 25,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  fancyCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  fancyTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: palette.cyanSoft,
  },
});
