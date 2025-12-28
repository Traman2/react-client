import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#000' : '#000',
        headerShown: false,
      }}>
      
      <Tabs.Screen
        name="home"
        options={{
            title: 'Home',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
            ),
            tabBarLabel: ({ focused }) => (
              <Text className={`text-xs text-black ${focused ? 'opacity-100' : 'opacity-40'}`}>
                Home
              </Text>
            ),
          }}
      />

      <Tabs.Screen
        name="budget"
        options={{
            title: 'Budget',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name={focused ? 'cash' : 'cash-outline'} size={24} color={color} />
            ),
            tabBarLabel: ({ focused }) => (
              <Text className={`text-xs text-black ${focused ? 'opacity-100' : 'opacity-40'}`}>
                Budget
              </Text>
            ),
          }}
      />

      <Tabs.Screen
        name="trips"
        options={{
            title: 'Trip',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name={focused ? 'airplane' : 'airplane-outline'} size={24} color={color} />
            ),
            tabBarLabel: ({ focused }) => (
              <Text className={`text-xs text-black ${focused ? 'opacity-100' : 'opacity-40'}`}>
                Trips
              </Text>
            ),
          }}
      />

      <Tabs.Screen
        name="school"
        options={{
            title: 'School',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name={focused ? 'school' : 'school-outline'} size={24} color={color} />
            ),
            tabBarLabel: ({ focused }) => (
              <Text className={`text-xs text-black ${focused ? 'opacity-100' : 'opacity-40'}`}>
                School
              </Text>
            ),
          }}
      />

      <Tabs.Screen
        name="settings"
        options={{
            title: 'Settings',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name={focused ? 'settings' : 'settings-outline'} size={24} color={color} />
            ),
            tabBarLabel: ({ focused }) => (
              <Text className={`text-xs text-black ${focused ? 'opacity-100' : 'opacity-40'}`}>
                Settings
              </Text>
            ),
          }}
      />
    </Tabs>
  );
}
