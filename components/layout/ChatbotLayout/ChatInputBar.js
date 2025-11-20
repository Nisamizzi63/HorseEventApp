// components/chat/ChatInputBar.jsx
import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import palette from '../../colors/palette';

export default function ChatInputBar({
  value,
  onChangeText,
  onSend,
  loading,
}) {
  return (
    <View style={styles.inputWrapper}>
      <View style={styles.inputInner}>
        <TouchableOpacity style={styles.plusButton}>
          <Ionicons
            name="add"
            size={20}
            color={palette.cyanSoft}
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Skriv en besked..."
          placeholderTextColor={palette.mint}
          value={value}
          onChangeText={onChangeText}
          editable={!loading}
          onSubmitEditing={onSend}
          returnKeyType="send"
        />

        <TouchableOpacity
          onPress={onSend}
          style={[styles.sendFab, loading && { opacity: 0.6 }]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={palette.white} />
          ) : (
            <Ionicons
              name="arrow-up"
              size={20}
              color={palette.white}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 14,
  },
  inputInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.white,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 6,
    paddingVertical: 6,
    color: palette.cyanSoft,
  },
  sendFab: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.aqua,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
});
