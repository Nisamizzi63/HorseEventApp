import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

//Shared Layout
import Header from '../components/layout/SharedLayout/Header';
import BottomMenuNavBar from '../components/layout/SharedLayout/BottomMenuNavBar';
import palette from '../components/colors/palette';

//Homescreen Layout
import SmallCard from '../components/layout/HomeScreenLayout/SmallCard';
import EventHighlightCard from '../components/layout/HomeScreenLayout/EventHighlightCard';
import MenuCard from '../components/layout/HomeScreenLayout/MenuCard';

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params?.user;
  const userName = user ? user.userName : 'gæst';

  return (
    <LinearGradient
      colors={[palette.lightblue, palette.darkblue]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Header
              userName={userName}
              onBack={() => navigation.goBack()}
              onProfile={() => navigation.navigate('Profil')}
            />

            {/* Top small cards */}
          <View style={styles.topCardsRow}>
            <SmallCard
              label="Dine heste"
              value="Se oversigt"
              onPress={() => navigation.navigate('Heste')}
              style={{ marginRight: 12 }}
            />
            <SmallCard
              label="Stævner"
              value="Kommende events"
              onPress={() => navigation.navigate('Events')}
            />
          </View>


            {/* Event highlight */}
            <EventHighlightCard
              title="Kommende events: Junior Riding Event"
              date="12 November, 2025"
              onPress={() => navigation.navigate('Events')}
            />

            {/* Main grid */}
            <View style={styles.grid}>
              <MenuCard
                title="Profil"
                subtitle="Administrér din konto"
                onPress={() => navigation.navigate('Profil')}
                icon={
                  <Ionicons
                    name="person-circle-outline"
                    size={32}
                    color={palette.pink}
                  />
                }
              />

              <MenuCard
                title="Chatbotten"
                subtitle="Chat med vores AI-assistent"
                onPress={() => navigation.navigate('Chatbot')}
                icon={
                  <MaterialCommunityIcons
                    name="robot-outline"
                    size={27}
                    color={palette.pink}
                  />
                }
              />

              <MenuCard
                title="Heste"
                subtitle="Se og rediger dine heste"
                onPress={() => navigation.navigate('Heste')}
                icon={<FontAwesome5 name="horse" size={25} color={palette.pink} />}
              />

              <MenuCard
                title="Stævner"
                subtitle="Planlæg dine stævner"
                onPress={() => navigation.navigate('Events')}
                icon={<FontAwesome name="trophy" size={25} color={palette.pink} />}
              />
            </View>
          </View>
        </ScrollView>
        <BottomMenuNavBar navigation={navigation} />
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
    backgroundColor: 'transparent', // important so gradient shows through
  },
  scroll: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  topCardsRow: {
    flexDirection: 'row',
    marginTop: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 18,
  },
});
