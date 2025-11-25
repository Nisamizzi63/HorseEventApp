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
import HorseCard from '../components/horses/HorseCard';
import palette from '../components/colors/palette';
import Header from '../components/layout/SharedLayout/Header';
import BottomMenuNavBar from '../components/layout/SharedLayout/BottomMenuNavBar';
import { FontAwesome } from '@expo/vector-icons';

import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl;

export default function HorsesScreen() {
  const navigation = useNavigation();
  const [horses, setHorses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState(''); 

  const fetchHorses = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/Horse`);

      if (!response.ok) {
        throw new Error('Kunne ikke hente heste');
      }

      const data = await response.json();

      const mapped = data.map(h => ({
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

  // 🔍 filtrer hestene baseret på søgetekst
  const normalizedSearch = searchText.trim().toLowerCase();
  const filteredHorses = horses.filter(horse => {
    if (!normalizedSearch) return true;

    const name = (horse.name || '').toLowerCase();
    const ueln = (horse.ueln || '').toLowerCase();
    const birthYear = horse.birthYear ? String(horse.birthYear) : '';
    const height = horse.height ? String(horse.height) : '';

    return (
      name.includes(normalizedSearch) ||
      ueln.includes(normalizedSearch) ||
      birthYear.includes(normalizedSearch) ||
      height.includes(normalizedSearch)
    );
  });

  const hasNoHorses = !loading && !error && horses.length === 0;

  return (
    <LinearGradient
      colors={[palette.darkblue, palette.lightpink]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}
    >
      {/* TOP SAFE AREA: header ovenpå gradienten */}
      <SafeAreaView edges={['top']} style={styles.topSafeArea}>
        <View style={styles.headerBar}>
          <Header
            title="Mine heste"
            subtitle="Overblik over dine heste"
            onHome={() => navigation.navigate('Home')}
            onBack={() => navigation.goBack()}
            onProfile={() => navigation.navigate('Profil')}
          />
        </View>
      </SafeAreaView>

      {/* BUND: indhold + bottom navbar ovenpå gradient */}
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
              <Text style={styles.loadingText}>Henter heste...</Text>
            </View>
          ) : hasNoHorses ? (
            <View style={styles.center}>
              <Text style={styles.emptyText}>Du har ingen heste endnu.</Text>
            </View>
          ) : (
            <>
              {/* 🔍 SØGEFELT */}
              <View style={styles.searchContainer}>
                <FontAwesome
                  name="search"
                  size={18}
                  color="rgba(255,255,255,0.7)"
                  style={styles.searchIcon}
                />

                <TextInput
                  style={styles.searchInput}
                  placeholder="Søg efter hest (navn, UELN, år, højde)"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>

              <View style={styles.listWrapper}>
                <FlatList
                  data={filteredHorses}
                  keyExtractor={item => item.id.toString()}
                  contentContainerStyle={styles.listContent}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
                  renderItem={({ item }) => (
                    <HorseCard
                      horse={item}
                      onPress={() =>
                        navigation.navigate('HorseDetails', { horse: item })
                      }
                    />
                  )}
                  ListEmptyComponent={() => (
                    <View style={styles.center}>
                      <Text style={styles.emptyText}>
                        {searchText
                          ? 'Ingen heste matcher din søgning.'
                          : 'Du har ingen heste endnu.'}
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

  // TOP SAFE AREA / HEADER
  topSafeArea: {
    backgroundColor: 'transparent',
  },
  headerBar: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: 'center',
  },

  // BUND-OMRÅDE (indhold + bottom navbar)
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

  // 🔍 søgefelt
  searchContainer: {
    marginBottom: 10,
    marginHorizontal: 8,
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

