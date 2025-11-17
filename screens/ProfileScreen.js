// ProfileScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';

const API_BASE_URL = 'http://10.0.0.7:5068'; 


export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [riderName, setRiderName] = useState(user?.name ?? '');
  const [drfId, setDrfId] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [riderEmail, setRiderEmail] = useState(user?.email ?? '');
  

  const stats = [ //dummy data
    { label: 'Stævner', value: '12' },
    { label: 'Læringsmoduler', value: '8' },
    { label: 'Træningstimer', value: '45' },
    { label: 'Præstationer', value: '3' },
  ];

  const horses = [ //dummy data
    { name: 'Bella', details: 'Varmblod · 8 år' },
    { name: 'Shadow', details: 'Friser · 6 år' },
  ];

  const activities = [ //dummy data
    { title: 'Gennemført springstævne', date: '15. oktober 2023' },
    { title: 'Avanceret springtræning', date: '10. oktober 2023' },
    { title: 'Planlagt træning med træner', date: '22. oktober 2023' },
  ];

  const handleCreateRider = async () => {
    if (!riderName || !riderEmail || !birthYear) {
      Alert.alert('Fejl', 'Udfyld navn, fødselsår og email.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/Rytter`, {
        // adjust path if your controller route is different
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
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBack}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profil</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top: person info */}
        <View style={styles.row}>
          <View style={[styles.card, styles.flex2]}>
            <View style={styles.profileTop}>
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://via.placeholder.com/150x150.png?text=Rider',
                }}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>
                  {user?.name ?? 'Ikke logget ind'}
                </Text>

                <View style={styles.infoGroup}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>
                    {user?.email ?? 'Ingen email'}
                  </Text>

                <View style={styles.infoGroup}>
                  <Text style={styles.infoLabel}>DRF licens nummer</Text>
                  <Text style={styles.infoValue}>
                    {user?.drfId ?? 'Ikke angivet'}
                  </Text>
                </View>

                <View style={styles.infoGroup}>
                  <Text style={styles.infoLabel}>Fødselsår</Text>
                  <Text style={styles.infoValue}>
                    {user?.birthYear ?? 'Ikke angivet'}
                  </Text>
                </View>

                </View>

                <TouchableOpacity style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>redigér</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.card, styles.flex1]}>
          <Text style={styles.sectionTitle}>Rytter information</Text>
          <TextInput
            style={styles.input}
            placeholder="DRF licens nummer"
            value={drfId}
            onChangeText={setDrfId}
          />
          <TextInput
            style={styles.input}
            placeholder="Rytterens fødselsår (fx 2000)"
            value={birthYear}
            onChangeText={setBirthYear}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.primaryButton} onPress={handleCreateRider}>
            <Text style={styles.primaryButtonText}>Opret rytter</Text>
          </TouchableOpacity>
        </View>

        {/* Hurtige stats */}
        <View style={[styles.card, styles.flex1]}>
          <Text style={styles.sectionTitle}>Hurtige stats</Text>
          <View style={styles.statsGrid}>
            {stats.map((s) => (
              <View key={s.label} style={styles.statItem}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Abonnement */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.sectionTitle}>Abonnement</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Redigér profil</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.subscriptionBanner}>
            <View>
              <Text style={styles.subscriptionPlan}>Premium Rytter</Text>
              <Text style={styles.subscriptionRenewal}>
                Fornyes: 15. november 2023
              </Text>
            </View>
            <Text style={styles.subscriptionPrice}>29,99 €/md</Text>
          </View>

          <View style={styles.subscriptionFeatures}>
            <Text style={styles.featureItem}>• Ubegrænset stævnedeltagelse</Text>
            <Text style={styles.featureItem}>• Adgang til premium læring</Text>
            <Text style={styles.featureItem}>• Avanceret træningsanalyse</Text>
            <Text style={styles.featureItem}>• Prioriteret support</Text>
          </View>

          <View style={styles.subscriptionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Administrér abonnement</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Faktura-historik</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardHeaderRow}>
              <Text style={styles.sectionTitle}>Rideprofil</Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>Redigér</Text>
              </TouchableOpacity>
            </View>

        {/* Rideprofil & mål */}
        <View style={styles.row}>
          <View style={[styles.card, styles.flex1]}>
            <View>
              <Text style={styles.infoLabel}>Discipliner</Text>
              <View style={styles.tagRow}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Dressur</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Spring</Text>
                </View>
              </View>

              <Text style={[styles.infoLabel, { marginTop: 12 }]}>
                Certifikater
              </Text>
              <Text style={styles.infoValue}>
                Dressur niveau 1{'\n'}
                Basis førstehjælp hest
              </Text>
              <Text style={[styles.infoLabel, { marginTop: 12 }]}>
                Erfaring
              </Text>
              <Text style={styles.infoValue}>
                2 år
              </Text>
              <Text style={[styles.infoLabel, { marginTop: 12 }]}>
                Mål
              </Text>

              <Text style={styles.infoValue}>
              Deltage i regionale dressur-stævner{'\n'}
              Forbedre springteknik
              </Text>
            </View>
          </View>
        </View>

        {/* Seneste aktivitet */}
        <View style={styles.row}>
          <View style={[styles.card, styles.flex1]}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.sectionTitle}>Seneste aktivitet</Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>Se alle</Text>
              </TouchableOpacity>
            </View>

            {activities.map((a) => (
              <View key={a.title} style={styles.activityItem}>
                <Text style={styles.listTitle}>{a.title}</Text>
                <Text style={styles.activityDate}>{a.date}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Mine heste */}
        <View style={[styles.card, styles.flex1]}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.sectionTitle}>Mine heste</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Horses')}>
              <Text style={styles.linkText}>Se alle</Text>
            </TouchableOpacity>
          </View>

          {horses.map((horse) => (
            <View key={horse.name} style={styles.listItem}>
              <Image
                style={styles.horseAvatar}
                source={{
                  uri: 'https://via.placeholder.com/80x80.png?text=Horse',
                }}
              />
              <View style={styles.listItemText}>
                <Text style={styles.listTitle}>{horse.name}</Text>
                <Text style={styles.listSubtitle}>{horse.details}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const BG = '#f3f5ff';
const PRIMARY = '#0881ebff';
const ACCENT = '#7c3aed';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerBack: {
    padding: 4,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },

  // Layout
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  flex1: {
    flex: 1,
    marginHorizontal: 4,
  },
  flex2: {
    flex: 2,
    marginRight: 4,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  linkText: {
    fontSize: 13,
    color: PRIMARY,
    fontWeight: '500',
  },

  // Profile
  profileTop: {
    flexDirection: 'row',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5defe',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
  },
  badgeText: {
    color: ACCENT,
    fontSize: 12,
    fontWeight: '600',
  },
  infoGroup: {
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 13,
    color: '#111827',
  },

  // Stats
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#eef2ff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },

  // Subscription
  subscriptionBanner: {
    backgroundColor: '#e4e0ff',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subscriptionPlan: {
    fontWeight: '700',
  },
  subscriptionRenewal: {
    fontSize: 12,
    color: '#4b5563',
  },
  subscriptionPrice: {
    fontWeight: '700',
  },
  subscriptionFeatures: {
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 13,
    marginBottom: 2,
  },
  subscriptionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: ACCENT,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 6,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: ACCENT,
    paddingVertical: 10,
    alignItems: 'center',
    marginLeft: 6,
  },
  secondaryButtonText: {
    color: ACCENT,
    fontWeight: '600',
    fontSize: 13,
  },

  // Tags
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#eef2ff',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: PRIMARY,
  },

  // Lists
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  horseAvatar: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 10,
  },
  listItemText: {
    flex: 1,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  listSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  activityItem: {
    paddingVertical: 6,
  },
  activityDate: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },

  //Create Rider
    input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
    fontSize: 14,
  },

});