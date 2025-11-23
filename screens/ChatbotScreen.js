import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// Shared Layout
import palette from '../components/colors/palette';
import Header from '../components/layout/SharedLayout/Header';

// Chatbot layout
import ChatMessageList from '../components/layout/ChatbotLayout/ChatMessageList';
import ChatInputBar from '../components/layout/ChatbotLayout/ChatInputBar';

const API_BASE_URL = 'http://172.20.10.13:8000';

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
    <LinearGradient
      colors={[palette.darkblue, palette.lightpink]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}
    >
      {/* TOP SAFE AREA: white header area on top of gradient */}
      <SafeAreaView edges={['top']} style={styles.topSafeArea}>
        <View style={styles.headerBar}>
          <Header
            title="Chatbotten"
            subtitle="Jeg er din AI assistent!"
            onHome={() => navigation.navigate('Home')}
            onBack={() => navigation.goBack()}
            onProfile={() => navigation.navigate('Profil')}
          />
        </View>
      </SafeAreaView>

      {/* BOTTOM: chat content over gradient */}
      <SafeAreaView edges={['bottom']} style={styles.bottomSafeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
        >
          <View style={styles.chatContainer}>
            <View style={styles.chatArea}>
              <ChatMessageList
                messages={messages}
                listRef={listRef}
                onLayout={scrollToEnd}
                onContentSizeChange={scrollToEnd}
              />
            </View>

            <ChatInputBar
              value={input}
              onChangeText={setInput}
              onSend={sendMessage}
              loading={loading}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },

  // TOP SAFE AREA / HEADER
  topSafeArea: {
  backgroundColor: 'transparent',
  },
  headerBar: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: 'center',
  },


  // BOTTOM AREA (chat + bottom safe area)
  bottomSafeArea: {
    flex: 1,
    backgroundColor: 'transparent', // important so gradient is visible
  },

  keyboardWrapper: {
    flex: 1,
  },

  chatContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },

  chatArea: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 10,
  },
});






