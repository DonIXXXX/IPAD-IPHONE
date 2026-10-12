import * as Device from 'expo-device';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PerformanceCheck } from '@/components/checks/performance-check';
import { WifiCheck } from '@/components/checks/wifi-check';
import { StatusRow } from '@/components/status-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatBytes } from '@/utils/format';

const DEVICE_TYPES: Record<Device.DeviceType, string> = {
  [Device.DeviceType.PHONE]: 'Phone',
  [Device.DeviceType.TABLET]: 'Tablet',
  [Device.DeviceType.DESKTOP]: 'Computer',
  [Device.DeviceType.TV]: 'TV',
  [Device.DeviceType.UNKNOWN]: 'Unknown',
};

export default function DeviceScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + Spacing.three, paddingBottom: insets.bottom + BottomTabInset + Spacing.three },
      ]}>
      <View style={styles.container}>
        <ThemedText type="subtitle">My Device</ThemedText>

        <Section title="About">
          <StatusRow label="Model" value={Device.modelName ?? 'Unknown'} />
          <StatusRow label="Type" value={Device.deviceType !== null ? DEVICE_TYPES[Device.deviceType] : 'Unknown'} />
          <StatusRow label="Software" value={`${Device.osName ?? ''} ${Device.osVersion ?? ''}`.trim() || 'Unknown'} />
          {Device.totalMemory !== null && <StatusRow label="Memory (RAM)" value={formatBytes(Device.totalMemory)} />}
        </Section>

        <Section title="Network">
          <WifiCheck />
        </Section>

        <Section title="Health">
          <PerformanceCheck />
        </Section>
      </View>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
        {title}
      </ThemedText>
      <ThemedView type="backgroundElement" style={styles.card}>
        {children}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
    gap: Spacing.four,
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    paddingHorizontal: Spacing.two,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.two,
  },
});
