// screens/EventsScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  RefreshControl,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';

import EventCard from '../components/cards/EventCard';
import Header from '../components/layout/SharedLayout/Header';
import BottomMenuNavBar from '../components/layout/SharedLayout/BottomMenuNavBar';
import palette from '../components/colors/palette';

const API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl;

export default function EventsScreen() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  const fetchEvents = async () => {
    try {
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/Event`);
      if (!response.ok) {
        throw new Error('Fejl ved hentning af stævner');
      }

      const data = await response.json();

      // Tilpas felter til dit API hvis nødvendigt
      const mapped = data.map(e => ({
        id: e.id,
        name: e.name,
        location: e.location,
        startDate: e.startDate,
        endDate: e.endDate,
      }));

      setEvents(mapped);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Der opstod en fejl');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  const normalizedSearch = searchText.trim().toLowerCase();
  const filteredEvents = events.filter(ev => {
    if (!normalizedSearch) return true;

    const name = (ev.name || '').toLowerCase();
    const location = (ev.location || '').toLowerCase();
    const startDate = ev.startDate ? String(ev.startDate).toLowerCase() : '';

    return (
      name.includes(normalizedSearch) ||
      location.includes(normalizedSearch) ||
      startDate.includes(normalizedSearch)
    );
  });

  const hasNoEvents = !loading && !error && events.length === 0;

  return (
    <LinearGradient
      colors={[palette.darkblue, palette.lightpink]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}
    >
      {/* TOP-OMRÅDE / HEADER */}
      <SafeAreaView edges={['top']} style={styles.topSafeArea}>
        <View style={styles.headerBar}>
          <Header
            title="Mine stævner"
            subtitle="Overblik over dine stævner"
            onHome={() => navigation.navigate('Home')}
            onBack={() => navigation.goBack()}
            onProfile={() => navigation.navigate('Profil')}
          />
        </View>
      </SafeAreaView>

      {/* INDHOLD + BOTTOM NAVBAR */}
      <SafeAreaView edges={['bottom']} style={styles.bottomSafeArea}>
        <View style={styles.contentContainer}>
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {loading ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>Henter stævner...</Text>
            </View>
          ) : hasNoEvents ? (
            <View style={styles.center}>
              <Text style={styles.emptyText}>Du har ingen stævner endnu.</Text>
            </View>
          ) : (
            <>
              {/* SØGEFELT */}
              <View style={styles.searchContainer}>
                <FontAwesome
                  name="search"
                  size={18}
                  color="rgba(255,255,255,0.7)"
                  style={styles.searchIcon}
                />

                <TextInput
                  style={styles.searchInput}
                  placeholder="Søg efter stævne (navn, sted, dato)"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>

              {/* LISTE MED STÆVNER */}
              <View style={styles.listWrapper}>
                <FlatList
                  data={filteredEvents}
                  keyExtractor={item => item.id.toString()}
                  contentContainerStyle={styles.listContent}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
                  renderItem={({ item }) => (
                    <EventCard
                      event={item}
                      onPress={() =>
                        navigation.navigate('EventDetails', { event: item })
                      }
                    />
                  )}
                  ListEmptyComponent={() => (
                    <View style={styles.center}>
                      <Text style={styles.emptyText}>
                        {searchText
                          ? 'Ingen stævner matcher din søgning.'
                          : 'Du har ingen stævner endnu.'}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </>
          )}
        </View>

        <BottomMenuNavBar navigation={navigation} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },

  topSafeArea: {
    backgroundColor: 'transparent',
  },
  headerBar: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: 'center',
  },

  bottomSafeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 10,
  },

  listWrapper: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    paddingVertical: 8,
    paddingHorizontal: 4,
    overflow: 'hidden',
  },

  listContent: {
    paddingVertical: 8,
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
    color: '#fff',
  },
  emptyText: {
    fontSize: 16,
    color: '#fff',
  },

  errorBox: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fee2e2',
  },
  errorText: {
    color: '#b91c1c',
  },

  searchContainer: {
    marginBottom: 10,
    marginHorizontal: 8,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    top: '50%',
    transform: [{ translateY: -9 }],
    zIndex: 10,
  },
  searchInput: {
    borderRadius: 20,
    paddingVertical: 15,
    paddingLeft: 40,
    paddingRight: 14,
    backgroundColor: 'rgba(0,0,0,0.25)',
    color: '#fff',
    fontSize: 14,
  },
});
