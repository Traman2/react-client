import { Stack } from 'expo-router';
import { SetupProvider } from '../../contexts/setup';

export default function SetupLayout() {
  return (
    <SetupProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="biometric" options={{ headerShown: false }} />
      </Stack>
    </SetupProvider>
  );
}