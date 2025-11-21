import React, { useState, useRef } from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

//Shared Layout
import palette from '../components/colors/palette';
import Header from '../components/layout/SharedLayout/Header';
import BottomMenuNavBar from '../components/layout/SharedLayout/BottomMenuNavBar';

//Chatbotlayout
import ChatbotHeader from '../components/layout/ChatbotLayout/ChatbotHeader';
import ChatMessageList from '../components/layout/ChatbotLayout/ChatMessageList';
import ChatInputBar from '../components/layout/ChatbotLayout/ChatInputBar';

const API_BASE_URL = 'http://172.20.10.13:5068';

export default function ChatbotScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params?.user;
  const userName = user ? user.userName : 'gæst';

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text:
        'Hej 👋 Jeg er din HorseEvent AI-assistent.\n' +
        'Hvad skal vi snakke om i dag?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const listRef = useRef(null);

  function scrollToEnd() {
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({ animated: true });
    });
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { id: String(Date.now()), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    scrollToEnd();

    try {
      const res = await fetch(`${API_BASE_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, userName }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply =
        data?.answer?.trim?.() || 'Jeg kunne ikke finde et svar 🤔';

      const botMsg = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: reply,
      };
      setMessages(prev => [...prev, botMsg]);
      scrollToEnd();
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: String(Date.now() + 2),
          sender: 'bot',
          text:
            '⚠️ Jeg kunne ikke forbinde til serveren.\n' +
            'Tjek at backenden kører på ' +
            API_BASE_URL +
            ' og at din telefon/emulator er på samme netværk.',
        },
      ]);
      scrollToEnd();
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        {/* Global header (som på HomeScreen) */}
        <View style={styles.headerWrapper}>
          <Header
            onBack={() => navigation.goBack()}
            onProfile={() => navigation.navigate('Profil')}
          />
        </View>

        {/* Fancy gradient chatbot header */}
        <View style={styles.fancyHeaderWrapper}>
          <ChatbotHeader />
        </View>

        {/* chat container box */}
        <View style={styles.chatContainer}>
          {/* Beskeder */}
          <View style={styles.chatArea}>
            <ChatMessageList
              messages={messages}
              listRef={listRef}
              onLayout={scrollToEnd}
              onContentSizeChange={scrollToEnd}
            />
          </View>

          {/* Input inde i container */}
          <ChatInputBar
            value={input}
            onChangeText={setInput}
            onSend={sendMessage}
            loading={loading}
          />
        </View>

        {/* Fælles bottom navbar */}
        <BottomMenuNavBar navigation={navigation} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.midBlue,
  },
  keyboardWrapper: {
    flex: 1,
  },
  headerWrapper: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  fancyHeaderWrapper: {
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 4,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: palette.lightblue,
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 90, // plads til bottom navbar
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  chatArea: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 70, // plads til input inde i container
  },
});


