import { View, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={['top', 'bottom']}>
      <View className='flex-1 mx-4 mt-2'>
        <Text className='dark:text-white'>Home</Text>
      </View>
    </SafeAreaView>
  );
}
