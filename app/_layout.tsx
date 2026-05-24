import { useEffect, useState } from 'react';
import { SplashScreen } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { db } from '../src/db';
import { ServerStore } from '../src/stores/ServerStore';
import { MessageStore } from '../src/stores/MessageStore';
import { SettingsStore } from '../src/stores/SettingsStore';
import { ApiKeyStore } from '../src/stores/ApiKeyStore';
import { ModelListCache } from '../src/stores/ModelListCache';
import { AppState } from '../src/stores/AppState';

SplashScreen.preventAutoHideAsync();

export const serverStore = new ServerStore(db);
export const messageStore = new MessageStore(db);
export const settingsStore = new SettingsStore(db);
export const apiKeyStore = new ApiKeyStore();
export const modelListCache = new ModelListCache();
export const appState = new AppState();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await settingsStore.init();
        appState.init(settingsStore.lastServerId, settingsStore.lastThreadId);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        {/* @ts-expect-error Expo Router handles _layout.tsx */}
        <Slot />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
