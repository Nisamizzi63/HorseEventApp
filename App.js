import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './AuthContext';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import HorsesOverview from './screens/HorsesOverview';
import CreateHorse from './screens/CreateHorse';
import ChatbotScreen from './screens/ChatbotScreen';
import ProfileScreen from './screens/ProfileScreen';
import HorsesScreen from './screens/HorsesScreen';
import HorseDetailsScreen from './screens/HorseDetailsScreen';
import CalendarScreen from './screens/CalendarScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>   
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateHorse" component={CreateHorse} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />
        <Stack.Screen name="Profil" component={ProfileScreen} />
        <Stack.Screen name="Heste" component={HorsesScreen} />
        <Stack.Screen name="HorseDetails" component={HorseDetailsScreen} />
        <Stack.Screen name="Kalender" component={CalendarScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}