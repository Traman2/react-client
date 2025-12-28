import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useSetup } from '../../contexts/setup';

export default function SetupProfile() {
  const router = useRouter();
  const { setSetupData } = useSetup();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 px-6 pt-8">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create Your Profile
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-8">
          Tell us a bit about yourself
        </Text>

        <View className="mb-6">
          <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Name
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#9ca3af"
            className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-xl text-gray-900 dark:text-white"
          />
        </View>

        <View className="mb-8">
          <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-xl text-gray-900 dark:text-white"
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            setSetupData({ name, email });
            router.push('/setup/biometric' as any);
          }}
          className="bg-blue-500 px-8 py-4 rounded-xl w-full"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}