// screens/ProfileScreen.js
import React, { useState } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

// Shared Layout
import palette from '../components/colors/palette';
import Header from '../components/layout/SharedLayout/Header';

// ProfileScreenLayout
import UserInfoCard from '../components/layout/ProfileScreenLayout/UserInfoCard';
import RiderInfoForm from '../components/layout/ProfileScreenLayout/RiderInfoForm';
import StatsSection from '../components/layout/ProfileScreenLayout/StatsSection';
import SubscriptionSection from '../components/layout/ProfileScreenLayout/SubscriptionSection';
import RideProfileSection from '../components/layout/ProfileScreenLayout/RideProfileSection';
import RecentActivitySection from '../components/layout/ProfileScreenLayout/RecentActivitySection';
import HorseListSection from '../components/layout/ProfileScreenLayout/HorseListSection';

import { useAuth } from '../AuthContext';

const API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl;

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [drfId, setDrfId] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const stats = [
    { label: 'Stævner', value: '12' },
    { label: 'Læringsmoduler', value: '8' },
    { label: 'Træningstimer', value: '45' },
    { label: 'Præstationer', value: '3' },
  ];

  // Dummy data
  const horses = [
    { name: 'Bella', details: 'Varmblod · 8 år' },
    { name: 'Shadow', details: 'Friser · 6 år' },
  ];

  const activities = [
    { title: 'Gennemført springstævne', date: '15. oktober 2023' },
    { title: 'Avanceret springtræning', date: '10. oktober 2023' },
    { title: 'Planlagt træning med træner', date: '22. oktober 2023' },
  ];

  const handleCreateRider = async () => {
    const riderName = user?.name ?? '';
    const riderEmail = user?.email ?? '';

    if (!riderName || !riderEmail || !birthYear) {
      Alert.alert('Fejl', 'Udfyld navn, fødselsår og email.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/Rytter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: riderName,
          drfId: drfId,
          birthYear: parseInt(birthYear, 10),
          email: riderEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Kunne ikke oprette rytter.');
      }

      const createdRider = await response.json();
      console.log('Rytter oprettet:', createdRider);
      Alert.alert('Success', 'Rytter blev oprettet!');
    } catch (err) {
      console.error(err);
      Alert.alert('Fejl', err.message);
    }
  };

  return (
    <LinearGradient
      colors={[palette.darkblue, palette.lightpink]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}
    >
      
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>

            <View style={styles.headerWrapper}>
              <Header
                title="Profil"
                subtitle="Overblik over din rideprofil"
                onHome={() => navigation.navigate('Home')}
                onBack={() => navigation.goBack()}
                onProfile={() => navigation.navigate('Profil')}
              />
            </View>

            {/* Rest of profile content */}
            <UserInfoCard user={user} />

            <RiderInfoForm
              drfId={drfId}
              setDrfId={setDrfId}
              birthYear={birthYear}
              setBirthYear={setBirthYear}
              onSubmit={handleCreateRider}
            />

            <StatsSection stats={stats} />
            <SubscriptionSection />
            <RideProfileSection />
            <RecentActivitySection activities={activities} />

            <HorseListSection
              horses={horses}
              onSeeAll={() => navigation.navigate('Horses')}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  keyboardWrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },

  headerCard: {
    backgroundColor: palette.white,
    borderRadius: 16,
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});

