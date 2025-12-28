import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SetupWelcome() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 justify-center items-center px-6">
        <View className="items-center mb-12">
          <Ionicons name="airplane" size={80} color="#3b82f6" />
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-6">
            Welcome to TravelBuddy
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 mt-2 text-center">
            Let's set up your account to get started
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/setup/profile')}
          className="bg-blue-500 px-8 py-4 rounded-xl w-full"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}