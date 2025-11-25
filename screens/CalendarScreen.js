import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

import palette from '../components/colors/palette';
import Header from '../components/layout/SharedLayout/Header';
import BottomMenuNavBar from '../components/layout/SharedLayout/BottomMenuNavBar';

export default function CalendarScreen() {
  const navigation = useNavigation();

  // Dummy events – kan erstattes med API-data senere
  const [events] = useState([
    {
      id: '1',
      title: 'Springstævne – LB1',
      date: '2025-11-28',
      time: '10:30',
      location: 'Rideskole Nord',
      horse: 'Bella',
    },
    {
      id: '2',
      title: 'Træning – dressur',
      date: '2025-11-30',
      time: '17:00',
      location: 'Hjemmebane',
      horse: 'Storm',
    },
  ]);

  // 🗓️ Aktuel dato
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonthIndex = today.getMonth(); // 0-11

  // Månedsnavne (dansk)
  const monthNames = [
    'Januar',
    'Februar',
    'Marts',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'December',
  ];

  const currentMonthName = monthNames[currentMonthIndex];

  // Antal dage i denne måned
  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  }, [currentYear, currentMonthIndex]);

  // Lav et simpelt array [1, 2, ..., daysInMonth]
  const monthDays = useMemo(
    () => Array.from({ length: daysInMonth }, (_, i) => i + 1),
    [daysInMonth]
  );

  const renderEvent = ({ item }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventHeaderRow}>
        <View style={styles.eventTitleRow}>
          <FontAwesome5
            name="calendar-alt"
            size={18}
            color="#fff"
            style={styles.eventIcon}
          />
          <Text style={styles.eventTitle}>{item.title}</Text>
        </View>
        {item.horse ? (
          <Text style={styles.eventHorse}>{item.horse}</Text>
        ) : null}
      </View>

      <View style={styles.eventInfoRow}>
        <FontAwesome5
          name="clock"
          size={14}
          color="rgba(255,255,255,0.85)"
          style={styles.infoIcon}
        />
        <Text style={styles.eventInfoText}>
          {item.date} • {item.time}
        </Text>
      </View>

      <View style={styles.eventInfoRow}>
        <FontAwesome5
          name="map-marker-alt"
          size={14}
          color="rgba(255,255,255,0.85)"
          style={styles.infoIcon}
        />
        <Text style={styles.eventInfoText}>{item.location}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[palette.darkblue, palette.lightpink]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}
    >
      {/* TOP SAFE AREA / HEADER */}
      <SafeAreaView edges={['top']} style={styles.topSafeArea}>
        <View style={styles.headerBar}>
          <Header
            title="Kalender"
            subtitle="Dine kommende stævner & aftaler"
            onHome={() => navigation.navigate('Home')}
            onBack={() => navigation.goBack()}
            onProfile={() => navigation.navigate('Profil')}
          />
        </View>
      </SafeAreaView>

      {/* INDHOLD + BUND-NAV */}
      <SafeAreaView edges={['bottom']} style={styles.bottomSafeArea}>
        <View style={styles.contentContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Lille kalender / månedsoverblik */}
            <View style={styles.monthOverview}>
              <View style={styles.monthHeaderRow}>
                <Text style={styles.monthTitle}>
                  {currentMonthName} {currentYear}
                </Text>
                <Text style={styles.monthHint}>
                  Simpelt måneds-overblik – kan udvides med rigtig kalender-logik senere ✨
                </Text>
              </View>

              <View style={styles.weekDaysRow}>
                {['Man', 'Tir', 'Ons', 'Tors', 'Fre', 'Lør', 'Søn'].map(d => (
                  <Text key={d} style={styles.weekDayText}>
                    {d}
                  </Text>
                ))}
              </View>

              <View style={styles.fakeCalendarGrid}>
                {monthDays.map(day => (
                  <View key={day} style={styles.fakeDayCell}>
                    <Text style={styles.fakeDayText}>{day}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Liste af kommende events */}
            <Text style={styles.sectionTitle}>Kommende begivenheder</Text>

            {events.length === 0 ? (
              <View style={styles.center}>
                <Text style={styles.emptyText}>
                  Du har ingen begivenheder i kalenderen endnu.
                </Text>
              </View>
            ) : (
              <FlatList
                data={events}
                keyExtractor={item => item.id}
                renderItem={renderEvent}
                scrollEnabled={false}
                contentContainerStyle={styles.eventsList}
              />
            )}
          </ScrollView>
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

  scrollContent: {
    paddingBottom: 20,
  },

  monthOverview: {
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  monthHeaderRow: {
    marginBottom: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  monthHint: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 4,
  },
  weekDayText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    width: `${100 / 7}%`,
    textAlign: 'center',
  },
  fakeCalendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  fakeDayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fakeDayText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    marginLeft: 4,
  },

  eventsList: {
    paddingBottom: 10,
  },

  eventCard: {
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  eventHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  eventTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  eventIcon: {
    marginRight: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flexShrink: 1,
  },
  eventHorse: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    fontStyle: 'italic',
  },
  eventInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  infoIcon: {
    marginRight: 6,
  },
  eventInfoText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#fff',
  },
});
