import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '../contexts/auth';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function SignIn() {
  const { signIn, biometricEnabled } = useSession();

  // Auto-trigger biometrics when screen is focused
  useFocusEffect(
    useCallback(() => {
      if (biometricEnabled) {
        // Small delay to ensure screen is fully rendered
        const timer = setTimeout(async () => {
          await signIn();
        }, 300);

        return () => clearTimeout(timer);
      }
    }, [biometricEnabled])
  );

  const handleBiometricLogin = async () => {
    await signIn();
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 justify-center items-center px-6">
        <View className="items-center mb-12">
          <Ionicons name="finger-print" size={80} color="#000" />
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-6">
            Welcome Back
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 mt-2 text-center">
            Use biometric authentication to access your account
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleBiometricLogin}
          className="bg-blue-500 px-8 py-4 rounded-xl w-full"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Login with Biometrics
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}