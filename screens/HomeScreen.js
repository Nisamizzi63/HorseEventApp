import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}> HorseEvent</Text>
        </View>

        {/* Welcome message */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Velkommen, gæst!</Text>
          <Text style={styles.subText}>Hvad har du lyst til i dag?</Text>
        </View>

        {/* Grid buttons */}
        <View style={styles.grid}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={40} color="#7c3aed" />
            <Text style={styles.cardText}>Profil</Text>
            <Text style={styles.cardSubText}>Ændre konto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Chatbot')}>
            <MaterialCommunityIcons name="robot-outline" size={40} color="#7c3aed" />
            <Text style={styles.cardText}>Chatbotten</Text>
            <Text style={styles.cardSubText}>Chat med vores AI chatbot</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Horses')}>
            <FontAwesome5 name="horse" size={40} color="#7c3aed" />
            <Text style={styles.cardText}>Heste</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Events')}>
            <FontAwesome name="trophy" size={40} color="#7c3aed" />
            <Text style={styles.cardText}>Stævner</Text>
          </TouchableOpacity>
        </View>

        {/* Tilbage button at bottom */}
        <View style={styles.backWrapper}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#1d4ed8" />
            <Text style={styles.backText}>Tilbage</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom nav bar */}
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="compass" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="cloud-upload" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
    paddingBottom: 80, // space for navbar and back button
  },
  header: {
    backgroundColor: '#0881ebff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  welcomeContainer: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  card: {
    backgroundColor: 'white',
    width: '40%',
    height: 120,
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  cardSubText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },
  backWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#1d4ed8',
    fontWeight: '500',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 25,
    backgroundColor: '#7c3aed',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
