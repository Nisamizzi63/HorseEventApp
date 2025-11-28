// screens/EventDetailsScreen.js
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import AppHeader from '../components/SharedLayout/AppHeader';
import BackButton from '../components/SharedLayout/BackButton';
import BottomNavbar from '../components/SharedLayout/BottomMenuNavbar';

export default function EventDetailsScreen() {
  const route = useRoute();
  const { event } = route.params || {}; // 👈 no "as any" – pure JS

  if (!event) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <AppHeader title="Stævnedetaljer" />
          <View style={styles.content}>
            <Text style={styles.value}>Ingen stævnedata blev sendt.</Text>
          </View>
          <BackButton />
        </View>
        <BottomNavbar />
      </SafeAreaView>
    );
  }

  const startDateText = event.startDate
    ? new Date(event.startDate).toLocaleString()
    : '—';

  const endDateText = event.endDate
    ? new Date(event.endDate).toLocaleString()
    : '—';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title={event.name} />

        <View style={styles.content}>
          <Text style={styles.label}>Sted</Text>
          <Text style={styles.value}>{event.location || '—'}</Text>

          <Text style={styles.label}>Start</Text>
          <Text style={styles.value}>{startDateText}</Text>

          <Text style={styles.label}>Slut</Text>
          <Text style={styles.value}>{endDateText}</Text>

          {/* Tilføj flere felter her, f.eks. klasse, arrangør, noter osv. */}
        </View>

        <BackButton />
      </View>

      <BottomNavbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingBottom: 80,
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 16,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 4,
  },
});
