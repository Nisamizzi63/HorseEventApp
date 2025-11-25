import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import palette from '../../colors/palette';

export default function UserInfoCard({ user }) {
  return (
    <View style={styles.card}>
      <View style={styles.profileTop}>
        <View style={styles.avatarPlaceholder} />

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name ?? 'Ikke logget ind'}</Text>

          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email ?? 'Ingen email'}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>DRF licens nummer</Text>
            <Text style={styles.infoValue}>{user?.drfId ?? 'Ikke angivet'}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>Fødselsår</Text>
            <Text style={styles.infoValue}>{user?.birthYear ?? 'Ikke angivet'}</Text>
          </View>

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>redigér</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarPlaceholder: {
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: '#ddd',
  marginRight: 16,
},
  card: {
    backgroundColor: palette.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    marginTop: 20,
  },
  profileTop: { flexDirection: 'row' },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16
    
  },
  profileInfo: { 
    flex: 1 
  },

  profileName: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 8 
  },

  infoGroup: { 
    marginBottom: 6 
  },
  infoLabel: { 
    fontSize: 12, 
    color: palette.lightpurple
  },

  infoValue: { 
    fontSize: 13, 
    color: palette.darkblue 
  },
  
  primaryButton: {
    marginTop: 8,
    backgroundColor: palette.purple,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center'
  },
  
  primaryButtonText: { 
    color: 'white', 
    fontWeight: '600' 
  }
});
