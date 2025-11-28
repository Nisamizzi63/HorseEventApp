import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';

import AppButton from '../components/layout/WelcomeScreenLayout/AppButton';
import AuthHeader from '../components/layout/SignUpScreenLayout/AuthHeader';
import AuthCard from '../components/layout/SignUpScreenLayout/AuthCard';
import AuthSwitch from '../components/layout/SignUpScreenLayout/AuthSwitch';
import FormField from '../components/layout/SignUpScreenLayout/FormField';
import TermsCheckbox from '../components/layout/SignUpScreenLayout/TermsCheckbox';
import BottomAuthText from '../components/layout/SignUpScreenLayout/BottomAuthText';
import Constants from 'expo-constants';
import palette from '../components/colors/palette';

const API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl;
const CREATE_USER_URL = `${API_BASE_URL}/api/User`;

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Fejl', 'Alle felter skal udfyldes.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Fejl', 'Kodeordene matcher ikke.');
      return;
    }
    if (!agree) {
      Alert.alert('Fejl', 'Du skal acceptere betingelserne.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Fejl', 'Indtast en gyldig email.');
      return;
    }

    setIsSubmitting(true);

    try {
      const body = {
        userName: username,
        email: email,
        password: password,
      };

      const response = await fetch(CREATE_USER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        let message = 'Kunne ikke oprette brugeren.';
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            message = errorData.message;
          }
        } catch (_) {}
        Alert.alert('Fejl', message);
        return;
      }

      Alert.alert('Succes', 'Bruger oprettet!');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Fejl', 'Der opstod en fejl ved forbindelse til serveren.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.root}>
      <AuthHeader
        title="Opret din konto"
        subtitle="Få styr på dine stævner og heste ét sted."
      />

      <AuthCard>
        <AuthSwitch
          leftLabel="Log ind"
          rightLabel="Opret"
          active="right"
          onPressLeft={() => navigation.navigate('Login')}
          onPressRight={() => {}}
        />

        <FormField
          label="Brugernavn"
          placeholder="Vælg et brugernavn"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <FormField
          label="Email"
          placeholder="Din@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormField
          label="Kodeord"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <FormField
          label="Bekræft kodeord"
          placeholder="••••••••"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TermsCheckbox value={agree} onValueChange={setAgree} />

        <View style={styles.buttonArea}>
          <AppButton
            title={isSubmitting ? 'Opretter...' : 'Opret konto'}
            variant="secondary"
            onPress={handleSignup}
            disabled={isSubmitting}
          />
          {isSubmitting && <ActivityIndicator style={styles.spinner} />}
        </View>

        <BottomAuthText
          question="Har du allerede en konto?"
          actionLabel="Log ind"
          onPress={() => navigation.navigate('Login')}
        />
      </AuthCard>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.darkblue,
  },
  buttonArea: {
    marginBottom: 16,
  },
  spinner: {
    position: 'absolute',
    right: 20,
    top: 16,
  },
});