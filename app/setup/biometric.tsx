import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '../../contexts/auth';
import { useSetup } from '../../contexts/setup';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { useState, useEffect } from 'react';

export default function SetupBiometric() {
  const { setupProfile } = useSession();
  const { setupData } = useSetup();
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      setBiometricAvailable(hasHardware && isEnrolled);
    })();
  }, []);

  const handleSetupBiometric = async () => {
    if (!biometricAvailable) {
      Alert.alert(
        'Biometrics Not Available',
        'Please set up biometric authentication in your device settings first.',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Confirm your biometric authentication',
      cancelLabel: 'Cancel',
    });

    if (result.success) {
      await setupProfile({
        name: setupData.name,
        email: setupData.email,
        biometricEnabled: true,
        createdAt: Date.now(),
      });
    }
  };

  const handleSkip = async () => {
    await setupProfile({
      name: setupData.name,
      email: setupData.email,
      biometricEnabled: false,
      createdAt: Date.now(),
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 justify-center items-center px-6">
        <View className="items-center mb-12">
          <Ionicons name="shield-checkmark" size={80} color="#3b82f6" />
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-6">
            Secure Your Account
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 mt-2 text-center">
            Enable biometric authentication for quick and secure access
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSetupBiometric}
          className="bg-blue-500 px-8 py-4 rounded-xl w-full mb-4"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Enable Biometric Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSkip}
          className="px-8 py-4 w-full"
        >
          <Text className="text-gray-600 dark:text-gray-400 text-center text-lg">
            Skip for Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}