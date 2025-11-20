import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AppButton from '../components/layout/AppButton';
import AuthHeader from '../components/layout/AuthHeader';
import AuthCard from '../components/layout/AuthCard';
import AuthSwitch from '../components/layout/AuthSwitch';
import FormField from '../components/layout/FormField';
import TermsCheckbox from '../components/layout/TermsCheckbox';
import BottomAuthText from '../components/layout/BottomAuthText';
import colors from '../components/colors/colors';


const API_BASE_URL = 'http://172.20.10.13:5068';
const CREATE_USER_URL = `${API_BASE_URL}/api/User`;

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
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
        username: email.split('@')[0],
        email,
        password,
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
          label="Email"
          placeholder="your@email.com"
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
    backgroundColor: colors.teal,
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