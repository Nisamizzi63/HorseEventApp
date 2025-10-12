import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const horses = [
  { id: '1', name: 'Bella', breed: 'Dansk Sportspony', category: 'Ponyer' },
  { id: '2', name: 'Luna', breed: 'Welsh Pony', category: 'Ponyer' },
  { id: '3', name: 'Thunder', breed: 'Dansk Varmblod', category: 'Heste' },
  { id: '4', name: 'Storm', breed: 'Fjordhest', category: 'Heste' },
];

const categories = ['Ponyer', 'Heste'];

export default function HorseOverviewScreen() {
  const navigation = useNavigation();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Heste Oversigt</Text>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>Heste</Text>
      </View>

      {/* Collapsible Category Lists */}
      {categories.map((category) => (
        <View key={category}>
          <TouchableOpacity
            style={styles.categoryHeader}
            onPress={() => toggleCategory(category)}
          >
            <Text style={styles.categoryTitle}>{category}</Text>
            <Ionicons
              name={expandedCategory === category ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#7c3aed"
            />
          </TouchableOpacity>

          {expandedCategory === category && (
            <FlatList
              data={horses.filter((horse) => horse.category === category)}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => (
                <View style={styles.horseCard}>
                  <FontAwesome5 name="horse" size={24} color="#7c3aed" />
                  <Text style={styles.horseName}>{item.name}</Text>
                  <Text style={styles.horseBreed}>{item.breed}</Text>
                </View>
              )}
            />
          )}
        </View>
      ))}

      {/* Back Button (bottom left) */}
      <View style={styles.backWrapper}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#1d4ed8" />
          <Text style={styles.backText}>Tilbage</Text>
        </TouchableOpacity>
      </View>

      {/* Add Horse Button (bottom right) */}
      <View style={styles.addWrapper}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateHorse')}
        >
          <Ionicons name="add-circle-outline" size={20} color="#1d4ed8" />
          <Text style={styles.addText}>Tilføj hest</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#0881ebff',
    padding: 24,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  titleContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e9e9ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7c3aed',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  horseCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  horseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  horseBreed: {
    fontSize: 14,
    color: '#666',
  },
  backWrapper: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#1d4ed8',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  addWrapper: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    zIndex: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addText: {
    color: '#1d4ed8',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 16,
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});



