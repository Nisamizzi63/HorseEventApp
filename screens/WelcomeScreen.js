import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//Welcome Screen layout
import HeaderImage from '../components/layout/WelcomeScreenLayout/HeaderImage';
import BottomCard from '../components/layout/WelcomeScreenLayout/BottomCard';
import AppButton from '../components/layout/WelcomeScreenLayout/AppButton';
import colors from '../components/colors/palette';

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
    backgroundColor: colors.darkblue,
  },
  welcome: {
    fontSize: 20,
    color: colors.darkblue,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: colors.darkblue 
  },
  terms: {
    marginTop: 18,
    textAlign: 'center',
    fontSize: 12,
    color: colors.darkblue,  
  },
});
