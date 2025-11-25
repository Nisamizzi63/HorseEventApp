import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import AppHeader from '../components/layout/AppHeader';
import BackButton from '../components/layout/BackButton';
import BottomNavbar from '../components/layout/BottomNavbar';

export default function HorseDetailsScreen() {
  const route = useRoute();
  const { horse } = route.params; // horse kommer fra navigation.navigate(..., { horse })

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title={horse.name} />

        <View style={styles.content}>
          <Text style={styles.label}>UELN</Text>
          <Text style={styles.value}>{horse.ueln || '—'}</Text>

          <Text style={styles.label}>Højde</Text>
          <Text style={styles.value}>
            {horse.height ? `${horse.height} cm` : '—'}
          </Text>

          <Text style={styles.label}>Fødselsår</Text>
          <Text style={styles.value}>{horse.birthYear || '—'}</Text>

          {/* Her kan du senere tilføje flere felter */}
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