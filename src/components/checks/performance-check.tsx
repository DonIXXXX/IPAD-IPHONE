import { BatteryState, useBatteryLevel, useBatteryState, useLowPowerMode } from 'expo-battery';
import { Platform } from 'react-native';

import { StatusRow } from '@/components/status-row';
import { useStorage } from '@/hooks/use-storage';
import { formatBytes, formatPercent } from '@/utils/format';

export function PerformanceCheck() {
  const { storage } = useStorage();
  const freeFraction = storage ? storage.free / storage.total : null;

  return (
    <>
      {/* Battery readings are only available in the iPhone / iPad app. */}
      {Platform.OS !== 'web' && <PowerRows />}
      {storage && freeFraction !== null ? (
        <StatusRow
          label="Free storage"
          value={`${formatBytes(storage.free)} of ${formatBytes(storage.total)}`}
          status={freeFraction < 0.05 ? 'bad' : freeFraction < 0.1 ? 'warn' : 'good'}
        />
      ) : (
        <StatusRow label="Free storage" value="Open on your device to check" />
      )}
    </>
  );
}

function PowerRows() {
  const lowPowerMode = useLowPowerMode();
  const batteryLevel = useBatteryLevel();
  const batteryState = useBatteryState();

  const charging = batteryState === BatteryState.CHARGING || batteryState === BatteryState.FULL;

  return (
    <>
      <StatusRow
        label="Low Power Mode"
        value={lowPowerMode ? 'On — slows device' : 'Off'}
        status={lowPowerMode ? 'warn' : 'good'}
      />
      {batteryLevel >= 0 && (
        <StatusRow
          label="Battery"
          value={`${formatPercent(batteryLevel)}${charging ? ' (charging)' : ''}`}
          status={batteryLevel < 0.2 && !charging ? 'warn' : 'good'}
        />
      )}
    </>
  );
}
