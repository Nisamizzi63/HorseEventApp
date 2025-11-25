import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import palette from '../components/colors/palette';
import Header from '../components/layout/SharedLayout/Header';
import BottomNavbar from '../components/layout/BottomNavbar';

export default function HorseDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { horse } = route.params;

  return (
    <LinearGradient
      colors={[palette.darkblue, palette.lightpink]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}
    >
      {/* TOP: header over gradient */}
      <SafeAreaView edges={['top']} style={styles.topSafeArea}>
        <View style={styles.headerBar}>
          <Header
            title={horse.name || 'Hest'}
            subtitle="Hestedetaljer"
            onHome={() => navigation.navigate('Home')}
            onBack={() => navigation.goBack()}
            onProfile={() => navigation.navigate('Profil')}
          />
        </View>
      </SafeAreaView>

      {/* BOTTOM: content + bottom nav over gradient */}
      <SafeAreaView edges={['bottom']} style={styles.bottomSafeArea}>
        <View style={styles.pageContainer}>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionTitle}>Basisoplysninger</Text>

            <Text style={styles.label}>UELN</Text>
            <Text style={styles.value}>{horse.ueln || '—'}</Text>

            <Text style={styles.label}>Højde</Text>
            <Text style={styles.value}>
              {horse.height ? `${horse.height} cm` : '—'}
            </Text>

            <Text style={styles.label}>Fødselsår</Text>
            <Text style={styles.value}>{horse.birthYear || '—'}</Text>

            {/* Tilføj flere felter her senere */}
          </ScrollView>

          <BottomNavbar />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },

  // HEADER AREA
  topSafeArea: {
    backgroundColor: 'transparent',
  },
  headerBar: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: 'center',
  },

  // BOTTOM AREA
  bottomSafeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  pageContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 0,
    justifyContent: 'space-between',
  },

  content: {
    paddingVertical: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: palette.white,
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 4,
    color: palette.white,
  },
});