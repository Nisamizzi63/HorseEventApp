// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderImage from '../components/layout/HeaderImage';
import BottomCard from '../components/layout/BottomCard';
import AppButton from '../components/layout/AppButton';
import colors from '../components/colors/colors';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderImage source={require('../assets/ChildRiding.png')} />

      <BottomCard>
        <Text style={styles.welcome}>Velkommen til</Text>
        <Text style={styles.appName}>HorseEvent</Text>

        <AppButton
          title="Registrere dig"
          variant="primary"
          onPress={() => navigation.navigate('Signup')}
        />

        <AppButton
          title="Log Ind"
          variant="secondary"
          onPress={() => navigation.navigate('Login')}
        />

        <AppButton
          title="Fortsæt som gæst"
          variant="outline"
          onPress={() => navigation.navigate('Home')}
        />

        <Text style={styles.terms}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </BottomCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.teal,
  },
  welcome: {
    fontSize: 20,
    color: colors.grayDark,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#000',
  },
  terms: {
    marginTop: 18,
    textAlign: 'center',
    fontSize: 12,
    color: colors.grayMid,
  },
});

