import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import palette from '../../colors/palette';

const BottomMenuNavBar = ({ navigation }) => (
  <View style={styles.navbar}>
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Ionicons name="home" size={24} color={palette.white} />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => {}}>
      <Ionicons name="calendar" size={24} color={palette.white} />
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.centerButton}
      onPress={() => navigation.navigate('Chatbot')}
    >
      <Ionicons name="chatbubbles" size={24} color={palette.white} />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('Heste')}>
      <FontAwesome5 name="horse-head" size={24} color={palette.white} />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('Profil')}>
      <Ionicons name="person" size={24} color={palette.white} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: palette.mintBright,
  },
  centerButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: palette.aqua,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
});

export default BottomMenuNavBar;
