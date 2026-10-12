import { Stack } from 'expo-router';

import { BackgroundGradient } from '@/constants/theme';

/** Test screens fill the whole area, so they get a solid header instead of a see-through one. */
const solidHeader = {
  headerTransparent: false,
  headerStyle: { backgroundColor: BackgroundGradient[0] },
};

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#ffffff',
        headerTitleStyle: { color: '#ffffff' },
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
        contentStyle: { backgroundColor: BackgroundGradient[0] },
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="issue/[id]" options={{ title: '' }} />
      <Stack.Screen name="test/camera" options={{ title: 'Camera test', ...solidHeader }} />
      <Stack.Screen name="test/pen" options={{ title: 'Pencil test', gestureEnabled: false, ...solidHeader }} />
    </Stack>
  );
}
