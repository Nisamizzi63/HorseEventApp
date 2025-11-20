// components/Header.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import palette from '../colors/palette';

const Header = ({ userName, subtitle, onBack, onProfile }) => (
  <View style={styles.headerRow}>
    {/* LEFT SIDE: logo + title + subtitle */}
    <View style={styles.headerLeft}>
      <View style={styles.logoRow}>
        <View style={styles.logoCircle}>
          <Image
            source={require('../../assets/LogoHest.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.headerTitle}>HorseEvent</Text>
        
      </View>

      {subtitle ? (
        <Text style={styles.welcomeText}>{subtitle}</Text>
      ) : userName ? (
        <Text style={styles.welcomeText}>Velkommen, {userName} 👋</Text>
      ) : null}
    </View>

    {/* RIGHT SIDE: exactly like before */}
    <View style={styles.headerRight}>
      <TouchableOpacity style={styles.iconCircle} onPress={onBack}>
        <Ionicons name="chevron-back" size={18} color={palette.white} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.iconCircle, { marginLeft: 10 }]}
        onPress={onProfile}
      >
        <Ionicons
          name="person-circle-outline"
          size={22}
          color={palette.white}
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  headerLeft: {
    flex: 1,
  },

  // logo + "HorseEvent"
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: palette.mintBright,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  logoImage: {
    width: 50,
    height: 35,
    tintColor: '#cb6eabff', // pink horse
  },

  headerTitle: {
    color: palette.cyanSoft,
    textShadowRadius: 50,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 1,
  },
  welcomeText: {
    color: palette.mint,
    marginTop: 4,
    fontSize: 13,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: palette.aqua,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

