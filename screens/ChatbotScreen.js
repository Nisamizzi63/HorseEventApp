import React, { useState } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ChatbotScreen() {
  const navigation = useNavigation();

  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "bot",
      text: "Hej 👋 Jeg er din HorseEvent AI-assistent.\nStil mig et spørgsmål om PDF’en!",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const res = await fetch("http://192.168.226.239:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      const reply = data.reply || data.snippet || "Jeg kunne ikke finde et svar 🤔";

      const botMessage = {
        id: Date.now().toString(),
        sender: "bot",
        text: reply,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: "⚠️ Kunne ikke forbinde til serveren.",
        },
      ]);
    }
  };

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
          data={messages}
          keyExtractor={(item) => item.id}
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
        />

        {/* Input box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Skriv dit spørgsmål..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={20} color="white" />
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