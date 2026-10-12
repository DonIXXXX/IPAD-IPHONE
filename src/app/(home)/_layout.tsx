import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Device Helper', headerLargeTitle: true }} />
      <Stack.Screen name="issue/[id]" options={{ title: '' }} />
      <Stack.Screen name="test/camera" options={{ title: 'Camera test' }} />
      <Stack.Screen name="test/pen" options={{ title: 'Pencil test', gestureEnabled: false }} />
    </Stack>
  );
}
