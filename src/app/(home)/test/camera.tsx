import { CameraView, useCameraPermissions, type CameraType } from 'expo-camera';
import { useState } from 'react';
import { Linking, StyleSheet, View } from 'react-native';

import { StatusRow } from '@/components/status-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Spacing } from '@/constants/theme';

type CameraResult = 'waiting' | 'working' | 'failed';

export default function CameraTestScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [results, setResults] = useState<Record<CameraType, CameraResult>>({ back: 'waiting', front: 'waiting' });
  const [error, setError] = useState<string | null>(null);

  const setResult = (result: CameraResult) => setResults((prev) => ({ ...prev, [facing]: result }));

  if (!permission) {
    return <ThemedView style={styles.fill} />;
  }

  if (!permission.granted) {
    return (
      <ThemedView style={[styles.fill, styles.centered]}>
        <ThemedText style={styles.center}>To test the camera, this app needs permission to use it.</ThemedText>
        {permission.canAskAgain ? (
          <Button title="Allow camera" onPress={requestPermission} />
        ) : (
          <>
            <ThemedText type="small" themeColor="textSecondary" style={styles.center}>
              Camera access was turned off. Turn it on in Settings, then come back.
            </ThemedText>
            <Button title="Open Settings" onPress={() => Linking.openSettings()} />
          </>
        )}
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.fill}>
      <CameraView
        key={facing}
        style={styles.fill}
        facing={facing}
        onCameraReady={() => {
          setError(null);
          setResult('working');
        }}
        onMountError={(event) => {
          setError(event.message);
          setResult('failed');
        }}
      />
      <ThemedView style={styles.panel}>
        <StatusRow label="Back camera" value={label(results.back)} status={status(results.back)} />
        <StatusRow label="Front camera" value={label(results.front)} status={status(results.front)} />
        {error && (
          <ThemedText type="small" themeColor="textSecondary">
            {error}
          </ThemedText>
        )}
        <ThemedText type="small" themeColor="textSecondary">
          Check the picture is clear and not black, blurry or flickering.
        </ThemedText>
        <View>
          <Button
            title={facing === 'back' ? 'Switch to front camera' : 'Switch to back camera'}
            onPress={() => setFacing((f) => (f === 'back' ? 'front' : 'back'))}
          />
        </View>
      </ThemedView>
    </ThemedView>
  );
}

function label(result: CameraResult) {
  return result === 'working' ? 'Working' : result === 'failed' ? 'Failed to start' : 'Not tested yet';
}

function status(result: CameraResult) {
  return result === 'working' ? 'good' : result === 'failed' ? 'bad' : 'info';
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
    gap: Spacing.three,
  },
  center: {
    textAlign: 'center',
  },
  panel: {
    padding: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.two,
  },
});
