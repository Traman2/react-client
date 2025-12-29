import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '../../contexts/auth';
import { Ionicons } from '@expo/vector-icons';

export default function TripsScreen() {
  const { profile } = useSession();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={['top', 'bottom']}>
      <View className='flex-1 mx-4 mt-2'>
        <Text className='text-2xl font-bold dark:text-white mb-6'>Trips</Text>

        <View className='flex-row'>
          <Ionicons name="airplane" size={24} color="black" />
          <Text className='mb-8'>
            {profile?.email}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
