import React, { useEffect, useState } from 'react';
import AppHeader from '../components/layout/AppHeader';
import BackButton from '../components/layout/BackButton';
import BottomNavbar from '../components/layout/BottomNavbar';
import HorseCard from '../components/horses/HorseCard';
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl;

export default function HorsesScreen() {
  const navigation = useNavigation();
  const [horses, setHorses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchHorses = async () => {
    try {
      setError(null);


      const API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl;
      const response = await fetch(`${API_BASE_URL}/api/Horse`);

      
      if (!response.ok) {
        throw new Error('Kunne ikke hente heste');
      }

      const data = await response.json();

      // Hvis dit API allerede returnerer { id, ueln, name, height, birthYear }
      // kan du faktisk bare gøre: setHorses(data);
      const mapped = data.map((h) => ({
        id: h.id,
        ueln: h.ueln,
        name: h.name,
        height: h.height,
        birthYear: h.birthYear,
      }));

      setHorses(mapped);
    } catch (err) {
      setError(err.message || 'Der opstod en fejl');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHorses();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHorses();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader title="Mine heste" />
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Henter heste...</Text>
        </View>
        <BottomNavbar />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Mine heste" />

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {horses.length === 0 && !error ? (
          <View style={styles.center}>
            <Text style={styles.emptyText}>Du har ingen heste endnu.</Text>
          </View>
        ) : (
          <FlatList
            data={horses}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingVertical: 16, paddingBottom: 120 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <HorseCard
                horse={item}
                onPress={() => navigation.navigate('HorseDetails', { horse: item })}
              />
            )}
          />
        )}

        <BackButton />
      </View>

      <BottomNavbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3c95e3ff',   // SAME blue as header
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',        // content stays white
    paddingBottom: 80,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
  },
  errorBox: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fee2e2',
  },
  errorText: {
    color: '#b91c1c',
  },
});
