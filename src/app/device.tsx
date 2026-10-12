import * as Device from 'expo-device';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BatteryCheck } from '@/components/checks/battery-check';
import { PerformanceCheck } from '@/components/checks/performance-check';
import { WifiCheck } from '@/components/checks/wifi-check';
import { StatusRow } from '@/components/status-row';
import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { GradientBackground } from '@/components/ui/gradient-background';
import { BottomTabInset, MaxContentWidth, Spacing, WebTabBarInset } from '@/constants/theme';
import { formatBytes } from '@/utils/format';

const DEVICE_TYPES: Record<Device.DeviceType, string> = {
  [Device.DeviceType.PHONE]: 'Phone',
  [Device.DeviceType.TABLET]: 'Tablet',
  [Device.DeviceType.DESKTOP]: 'Computer',
  [Device.DeviceType.TV]: 'TV',
  [Device.DeviceType.UNKNOWN]: 'Unknown',
};

export default function DeviceScreen() {
  const insets = useSafeAreaInsets();

  return (
    <GradientBackground>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + Spacing.four + WebTabBarInset,
            paddingBottom: insets.bottom + BottomTabInset + Spacing.four,
          },
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

          <Section title="Battery">
            <BatteryCheck />
          </Section>

          <Section title="Health">
            <PerformanceCheck />
          </Section>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
        {title}
      </ThemedText>
      <GlassCard style={styles.card}>{children}</GlassCard>
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
    gap: Spacing.two,
  },
});
