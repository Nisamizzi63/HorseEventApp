import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import palette from '../../colors/palette';
import ConfirmModal from './ConfirmModal';

const BottomMenuNavBar = ({ navigation }) => {

  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleLogout = () => {
    setLogoutVisible(false);
    navigation.replace('Welcome'); //The logout navigation
  };

  return (
    <>
      <View style={styles.navbar}>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color={palette.lightpink} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Kalender')}>
          <Ionicons name="calendar" size={24} color={palette.lightpink} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.centerButton}
          onPress={() => navigation.navigate('Chatbot')}
        >
          <Ionicons name="chatbubbles" size={24} color={palette.lightpink} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Heste')}>
          <FontAwesome5 name="horse-head" size={24} color={palette.lightpink} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setLogoutVisible(true)}>
          <Ionicons name="exit" size={24} color={palette.lightpink} />
        </TouchableOpacity>

      </View>
      <ConfirmModal
        visible={logoutVisible}
        title="Log out?"
        message="Are you sure you want to log out?"
        onCancel={() => setLogoutVisible(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    left: -4,
    right: -4,
    bottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: palette.darkblue,
  },
  centerButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: palette.pink,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
});

export default BottomMenuNavBar;
