import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import palette from '../../colors/palette';

export default function SubscriptionSection() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>Abonnement</Text>
        <TouchableOpacity>
          <Text style={styles.link}>Redigér</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.banner}>
        <View>
          <Text style={styles.plan}>Premium Rytter</Text>
          <Text style={styles.info}>Fornyes: 15. november 2023</Text>
        </View>
        <Text style={styles.price}>29,99 €/md</Text>
      </View>

      <View>
        <Text>• Ubegrænset stævnedeltagelse</Text>
        <Text>• Adgang til premium læring</Text>
        <Text>• Avanceret træningsanalyse</Text>
        <Text>• Prioriteret support</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonTextPrimary}>Administrér</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonTextSecondary}>Faktura-historik</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: palette.white, borderRadius: 16, padding: 14, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  title: { fontSize: 16, fontWeight: '600' },
  link: { color: palette.purple },
  banner: {
    backgroundColor: palette.purple,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  plan: { fontWeight: '700' },
  info: { fontSize: 12 },
  price: { fontWeight: '700' },
  buttonRow: { flexDirection: 'row', marginTop: 10 },
  buttonPrimary: {
    flex: 1,
    backgroundColor: palette.purple,
    padding: 10,
    borderRadius: 999,
    marginRight: 6,
    alignItems: 'center'
  },
  buttonTextPrimary: { color: palette.white, fontWeight: '600' },
  buttonSecondary: {
    flex: 1,
    padding: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.lightpurple,
    alignItems: 'center'
  },
  buttonTextSecondary: { color: palette.darkblue, fontWeight: '600' }
});
