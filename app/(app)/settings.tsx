import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '../../contexts/auth';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { signOut, profile } = useSession();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={['top', 'bottom']}>
      <View className='flex-1 mx-4 mt-2'>
        <Text className='text-2xl font-bold dark:text-white mb-6'>Settings</Text>

        <View>
          <Text className='mb-8'>
            {profile?.email}
          </Text>
          <TouchableOpacity
            onPress={signOut}
            className='flex-row items-center bg-red-500 px-6 py-4 rounded-xl'
          >
            <Ionicons name="log-out-outline" size={24} color="white" />
            <Text className='text-white text-lg font-semibold ml-3'>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
