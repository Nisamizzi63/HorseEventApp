// src/screens/ChatbotScreen.jsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// 🔗 BACKEND URL — change this for your setup
// const BASE_URL = "http://10.0.2.2:8000";        // Android emulator
// const BASE_URL = "http://127.0.0.1:8000";       // iOS simulator (Mac)
const BASE_URL = "http://10.0.0.7:8000";       // Physical device (your PC LAN IP)

export default function ChatbotScreen() {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text:
        "Hej 👋 Jeg er din HorseEvent AI-assistent.\n" +
        "Hvad skal vi snakke om idag?",
    },
  ]);
  const [input, setInput] = useState("");
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

    const userMsg = { id: String(Date.now()), sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    scrollToEnd();

    try {
      const res = await fetch(`${BASE_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });

      // If backend isn’t reachable or returns non-2xx
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      // 👇 IMPORTANT: backend returns { answer: "..." }
      const reply = data?.answer?.trim?.() || "Jeg kunne ikke finde et svar 🤔";

      const botMsg = { id: String(Date.now() + 1), sender: "bot", text: reply };
      setMessages((prev) => [...prev, botMsg]);
      scrollToEnd();
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 2),
          sender: "bot",
          text:
            "⚠️ Jeg kunne ikke forbinde til serveren.\n" +
            "Tjek at backenden kører på " +
            BASE_URL +
            " og at din telefon/emulator er på samme netværk.",
        },
      ]);
      scrollToEnd();
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>HorseEvent</Text>
      </View>

      {/* Chat area */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 8 }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.message,
                item.sender === "user" ? styles.userMsg : styles.botMsg,
              ]}
            >
              <Text style={styles.msgText}>{item.text}</Text>
            </View>
          )}
          onContentSizeChange={scrollToEnd}
          onLayout={scrollToEnd}
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Skriv dit spørgsmål..."
            value={input}
            onChangeText={setInput}
            editable={!loading}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={[styles.sendButton, loading && { opacity: 0.6 }]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Ionicons name="send" size={20} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Bottom nav bar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="compass" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="cloud-upload" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#0881ebff",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: { fontSize: 22, color: "white", fontWeight: "bold" },
  container: { flex: 1, padding: 10, marginBottom: 60 },
  message: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 15,
    maxWidth: "80%",
  },
  userMsg: {
    backgroundColor: "#7c3aed",
    alignSelf: "flex-end",
  },
  botMsg: {
    backgroundColor: "#e5e7eb",
    alignSelf: "flex-start",
  },
  msgText: { color: "#000" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#7c3aed",
    padding: 12,
    borderRadius: 50,
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#7c3aed",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});