import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../colors/colors';

export default function BottomNavbar() {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <View style={styles.navbarInner}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Events')}>
          <Ionicons name="calendar" size={24} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.centerButton}
          onPress={() => navigation.navigate('Chatbot')}
        >
          <Ionicons name="chatbubbles" size={24} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Heste')}>
          <Ionicons name="paw" size={24} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profil')}>
          <Ionicons name="person" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  navbarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.teal,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 26,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  centerButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
