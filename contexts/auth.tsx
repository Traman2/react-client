import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter, useSegments } from 'expo-router';
import { Platform, AppState, AppStateStatus } from 'react-native';

export interface UserProfile {
  name: string;
  email: string;
  biometricEnabled: boolean;
  createdAt: number;
}

const AuthContext = createContext<{
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  authenticateWithBiometrics: () => Promise<boolean>;
  setupProfile: (profileData: UserProfile) => Promise<void>;
  session?: string | null;
  isLoading: boolean;
  hasProfile: boolean;
  profile?: UserProfile | null;
  biometricEnabled: boolean;
}>({
  signIn: async () => {},
  signOut: async () => {},
  authenticateWithBiometrics: async () => false,
  setupProfile: async () => {},
  session: null,
  isLoading: false,
  hasProfile: false,
  profile: null,
  biometricEnabled: false,
});

const SESSION_KEY = 'user_session';
const PROFILE_KEY = 'user_profile';

async function getStoredValue(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  }
  return await SecureStore.getItemAsync(key);
}

async function storeValue(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

async function removeValue(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | null>(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();
  const appState = useRef(AppState.currentState);

  // Load initial auth data
  useEffect(() => {
    (async () => {
      try {
        const storedProfileStr = await getStoredValue(PROFILE_KEY);
        if (storedProfileStr) {
          const profileData = JSON.parse(storedProfileStr) as UserProfile;
          setProfile(profileData);
          setHasProfile(true);
        }

        const storedSession = await getStoredValue(SESSION_KEY);
        setSession(storedSession);
      } catch (error) {
        console.error('Error loading auth data:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Listen for app state changes to clear session when app goes to background
  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState: AppStateStatus) => {
      // When app goes to background or inactive, clear the session
      if (
        appState.current.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        console.log('App has gone to background - clearing session');
        await removeValue(SESSION_KEY);
        setSession(null);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(app)';
    const inSetup = segments[0] === 'setup';

    if (!session && !hasProfile && !inSetup && segments[0] !== 'sign-in') {
      router.replace('/setup' as any);
    } else if (!session && hasProfile && segments[0] !== 'sign-in') {
      router.replace('/sign-in' as any);
    } else if (session && !inAuthGroup) {
      router.replace('/(app)/home' as any);
    }
  }, [session, hasProfile, segments, isLoading]);

  const authenticateWithBiometrics = async (): Promise<boolean> => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        console.log('No biometric hardware available');
        return false;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        console.log('No biometrics enrolled');
        return false;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access TravelBuddy',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });

      return result.success;
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return false;
    }
  };

  const signIn = async () => {
    // Check if user has biometrics enabled in their profile
    if (profile?.biometricEnabled) {
      const authenticated = await authenticateWithBiometrics();
      if (authenticated) {
        const mockSession = 'authenticated_' + Date.now();
        await storeValue(SESSION_KEY, mockSession);
        setSession(mockSession);
      }
    } else {
      // If biometrics not enabled, just sign in (fallback)
      const mockSession = 'authenticated_' + Date.now();
      await storeValue(SESSION_KEY, mockSession);
      setSession(mockSession);
    }
  };

  const signOut = async () => {
    await removeValue(SESSION_KEY);
    setSession(null);
  };

  const setupProfile = async (profileData: UserProfile) => {
    await storeValue(PROFILE_KEY, JSON.stringify(profileData));
    setProfile(profileData);
    setHasProfile(true);

    const mockSession = 'authenticated_' + Date.now();
    await storeValue(SESSION_KEY, mockSession);
    setSession(mockSession);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        authenticateWithBiometrics,
        setupProfile,
        session,
        isLoading,
        hasProfile,
        profile,
        biometricEnabled: profile?.biometricEnabled ?? false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}
