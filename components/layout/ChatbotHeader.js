// components/chat/ChatbotHeader.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import palette from '../colors/palette';

export default function ChatbotHeader() {
  return (
    <LinearGradient
      colors={[palette.white, palette.dark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.fancyHeader}
    >
      <View style={styles.fancyCenter}>
        <View style={styles.botAvatarCircle}>
          <Ionicons name="chatbubble-ellipses" size={18} color={palette.white} />
        </View>
        <Text style={styles.fancyTitle}>Chatbotten</Text>
        <Text style={styles.fancySubtitle}>Din assistent</Text>
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
    paddingVertical: 8,
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
  botAvatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.aqua,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  fancyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.cyanSoft,
  },
  fancySubtitle: {
    fontSize: 11,
    color: palette.mint,
    marginTop: 2,
  },
});
