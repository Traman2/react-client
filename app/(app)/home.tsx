import { View, Text, TouchableOpacity, ScrollView, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSession } from '@/contexts/auth';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 24; // Account for mx-3 padding

export default function HomeScreen() {
  const { profile } = useSession();
  const router = useRouter();
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CARD_WIDTH);
    setActiveCardIndex(index);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#153c4e] dark:bg-gray-900" edges={['top']}>
      {/* Main Hero area */}
      <View className='flex'>
        {/* Top section layout*/}
        <View className='flex-row justify-between items-center mx-5 mt-4 mb-8'>
          <Text className='text-white text-2xl font-bold tracking-tight'>Good Morning, {profile?.name}</Text>
          <View className='bg-gray-300 p-2 rounded-full'>
            <Ionicons name="add" color={"#000"} size={24} />
          </View>
        </View>

        {/* Swipeable Cards */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          snapToInterval={CARD_WIDTH}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 12 }}
        >
          {/* Card 1 - Monthly Balance */}
          <View className='py-4 px-4 bg-[#cffafe] rounded-xl mr-3' style={{ width: CARD_WIDTH }}>
            <View className='flex-row justify-between'>
              <View>
                <View className='flex-row items-center gap-2 mb-4'>
                  <Ionicons name="wallet-outline" size={22} color="#164e63" />
                  <Text className='text-[#164e63] font-semibold tracking-wide uppercase'>Monthly Balance</Text>
                </View>
                <Text className='text-4xl font-bold text-[#164e63] tracking-tight'>$723.21</Text>

              </View>
              <TouchableOpacity
                onPress={() => {
                  router.push('/(app)/budget' as any);
                }}>
                <View className='bg-[#06b6d4] rounded-xl py-1 px-3 self-start'>
                  <Text className='text-white font-semibold text-sm'>See more</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text className='mt-4 mb-1 text-[#164e63] font-medium'>Money Left: $235.30</Text>
            <View className='h-5 w-full flex-row bg-gray-300 rounded-lg overflow-hidden'>
              <View className='w-[30%] h-full bg-black' />
              <View className='w-[10%] h-full bg-blue-600' />
              <View className='w-[20%] h-full bg-green-600' />
              <View className='w-[20%] h-full bg-orange-500' />
            </View>

            {/* Legend */}
            <View className='flex-row mt-3 gap-4'>
              <View className='flex-row items-center gap-2'>
                <View className='w-3 h-3 bg-black rounded-lg' />
                <Text className='text-xs text-[#164e63]/70 font-medium'>Food</Text>
              </View>

              <View className='flex-row items-center gap-2'>
                <View className='w-3 h-3 bg-blue-600 rounded-lg' />
                <Text className='text-xs text-[#164e63]/70 font-medium'>Phone Plan</Text>
              </View>

              <View className='flex-row items-center gap-2'>
                <View className='w-3 h-3 bg-green-600 rounded-lg' />
                <Text className='text-xs text-[#164e63]/70 font-medium'>Utilities</Text>
              </View>

              <View className='flex-row items-center gap-2'>
                <View className='w-3 h-3 bg-orange-500 rounded-lg' />
                <Text className='text-xs text-[#164e63]/70 font-medium'>Other</Text>
              </View>
            </View>

            {/* AI Advice*/}
            <View className='flex-row gap-2 items-center mt-5'>
              <Ionicons name="information-circle-outline" size={18} />
              <Text className='text-lg font-medium'>AI Advice</Text>
            </View>
            <Text className='text-sm'>
              Try and cut down on groceries to stay within target for this
              month. You are almost over your alloted budget so be careful on
              what you spend.
            </Text>
          </View>

          {/* Card 2 - Assignments */}
          <View className='py-5 px-4 bg-[#cffafe] rounded-xl' style={{ width: CARD_WIDTH }}>
            <View className='flex-row justify-between items-center mb-6'>
              <View className='flex-row items-center gap-2'>
                <Ionicons name="school-outline" size={20} color="#164e63" />
                <Text className='text-[#164e63] text-xs font-semibold tracking-wide uppercase'>Assignments</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  router.push('/(app)/school' as any);
                }}>
                <View className='bg-[#06b6d4] rounded-xl py-1 px-3 self-start'>
                  <Text className='text-white font-semibold text-sm'>See more</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Horizontal Cards */}
            <View className='flex-row gap-3 mb-5'>
              {/* Projects */}
              <View className='flex-1 bg-white/50 rounded-2xl p-4 items-center justify-center' style={{ aspectRatio: 1 }}>
                <Text className='text-4xl font-bold text-[#164e63] mb-1'>3</Text>
                <Text className='text-[#164e63]/60 text-xs font-medium text-center'>Projects</Text>
              </View>

              {/* Homework */}
              <View className='flex-1 bg-white/50 rounded-2xl p-4 items-center justify-center' style={{ aspectRatio: 1 }}>
                <Text className='text-4xl font-bold text-[#164e63] mb-1'>2</Text>
                <Text className='text-[#164e63]/60 text-xs font-medium text-center'>Homework</Text>
              </View>

              {/* Quizzes */}
              <View className='flex-1 bg-white/50 rounded-2xl p-4 items-center justify-center' style={{ aspectRatio: 1 }}>
                <Text className='text-4xl font-bold text-[#164e63] mb-1'>4</Text>
                <Text className='text-[#164e63]/60 text-xs font-medium text-center'>Quizzes</Text>
              </View>
            </View>

            {/* Summary Text */}
            <Text className='text-[#164e63]/70 text-sm text-center'>9 assignments due this week</Text>
          </View>
        </ScrollView>

        {/* Pagination Dots */}
        <View className='flex-row justify-center items-center gap-2 mt-4 mb-6'>
          <View className={`h-2 rounded-full ${activeCardIndex === 0 ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />
          <View className={`h-2 rounded-full ${activeCardIndex === 1 ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />
        </View>
      </View>

      <View className='flex-1 px-4 mt-2 bg-black rounded-t-3xl'>
        <Text className='text-white'>Hi</Text>
      </View>
    </SafeAreaView>
  );
}
