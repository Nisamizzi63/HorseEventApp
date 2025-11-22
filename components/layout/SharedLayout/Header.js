import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import palette from '../../colors/palette';

const Header = ({ userName, subtitle, onBack, onProfile }) => (
  <View style={styles.headerRow}>

    {/* LEFT SIDE */}
    <View style={styles.headerLeft}>
      <View style={styles.logoRow}>

        {/* Logo */}
        <View style={styles.logoCircle}>
          <Image
            source={require('../../../assets/LogoHest.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Title column: HorseEvent + velkommen under */}
        <View style={styles.titleColumn}>
          <Text style={styles.headerTitle}>Horse</Text>

          {subtitle ? (
            <Text style={styles.welcomeText}>{subtitle}</Text>
          ) : userName ? (
            <Text style={styles.welcomeText}>Velkommen, {userName} 👋</Text>
          ) : null}
        </View>

      </View>
    </View>

    {/* RIGHT SIDE */}
    <View style={styles.headerRight}>
      <TouchableOpacity style={styles.iconCircle} onPress={onBack}>
        <Ionicons name="chevron-back" size={18} color={palette.lightpink} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.iconCircle, { marginLeft: 10 }]}
        onPress={onProfile}
      >
        <Ionicons
          name="person-circle-outline"
          size={22}
          color={palette.lightpink}
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

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: palette.darkblue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },

  logoImage: {
    width: 50,
    height: 35,
    tintColor: palette.pink,
  },

  titleColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  headerTitle: {
    color: palette.darkblue,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: -2,
  },

  welcomeText: {
    color: palette.darkblue,
    fontSize: 13,
    marginTop: 0,      
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: palette.pink,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
