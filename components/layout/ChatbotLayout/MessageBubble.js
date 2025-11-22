// components/chat/MessageBubble.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import palette from '../../colors/palette';

export default function MessageBubble({ sender, text }) {
  const isUser = sender === 'user';

  return (
    <View
      style={[
        styles.messageRow,
        isUser ? styles.userRow : styles.botRow,
      ]}
    >
      {!isUser && (
        <View style={styles.avatarBot}>
          <Ionicons
            name="chatbubble-ellipses"
            size={18}
            color={palette.pink}
          />
        </View>
      )}

      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isUser ? styles.userText : styles.botText,
          ]}
        >
          {text}
        </Text>
      </View>

      {isUser && (
        <View style={styles.avatarUser}>
          <Ionicons name="person" size={18} color={palette.pink} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
  },
  botRow: {
    justifyContent: 'flex-start',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  botBubble: {
    backgroundColor: palette.white,
    borderBottomLeftRadius: 4,
    marginLeft: 8,
  },
  userBubble: {
    backgroundColor: palette.pink,
    borderBottomRightRadius: 4,
    marginRight: 8,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 18,
  },
  botText: {
    color: palette.darkblue,
  },
  userText: {
    color: palette.darkblue,
  },
  avatarBot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.darkblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarUser: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.lightpink,
    alignItems: 'center',
    justifyContent: 'center',
  },
});