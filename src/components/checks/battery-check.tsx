import { BatteryState, useBatteryLevel, useBatteryState, useLowPowerMode } from 'expo-battery';
import { Platform } from 'react-native';

import { StatusRow } from '@/components/status-row';
import { formatPercent } from '@/utils/format';

const STATE_LABELS: Record<BatteryState, string> = {
  [BatteryState.UNKNOWN]: 'Unknown',
  [BatteryState.UNPLUGGED]: 'Not charging',
  [BatteryState.CHARGING]: 'Charging',
  [BatteryState.FULL]: 'Full',
  [BatteryState.NOT_CHARGING]: 'Plugged in, not charging',
};

export function BatteryCheck() {
  // Battery readings are only available in the iPhone / iPad app.
  if (Platform.OS === 'web') {
    return <StatusRow label="Battery" value="Open on your device to check" />;
  }
  return <DeviceBatteryCheck />;
}

function DeviceBatteryCheck() {
  const level = useBatteryLevel();
  const state = useBatteryState();
  const lowPowerMode = useLowPowerMode();

  const charging = state === BatteryState.CHARGING || state === BatteryState.FULL;

  if (level < 0) {
    return <StatusRow label="Battery" value="Not available on this device" />;
  }

  return (
    <>
      <StatusRow
        label="Battery level"
        value={formatPercent(level)}
        status={level < 0.2 ? 'bad' : level < 0.5 ? 'warn' : 'good'}
      />
      <StatusRow
        label="Charging"
        value={STATE_LABELS[state]}
        status={charging ? 'good' : state === BatteryState.NOT_CHARGING ? 'bad' : 'info'}
      />
      <StatusRow label="Low Power Mode" value={lowPowerMode ? 'On' : 'Off'} status={lowPowerMode ? 'warn' : 'info'} />
    </>
  );
}
