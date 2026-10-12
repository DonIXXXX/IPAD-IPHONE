import { NetworkStateType, useNetworkState } from 'expo-network';

import { StatusRow } from '@/components/status-row';
import { Button } from '@/components/ui/button';
import { useInternetTest } from '@/hooks/use-internet-test';

const TYPE_LABELS: Partial<Record<NetworkStateType, string>> = {
  [NetworkStateType.WIFI]: 'Wi-Fi',
  [NetworkStateType.CELLULAR]: 'Mobile data',
  [NetworkStateType.ETHERNET]: 'Ethernet',
  [NetworkStateType.VPN]: 'VPN',
  [NetworkStateType.NONE]: 'Not connected',
};

export function WifiCheck() {
  const network = useNetworkState();
  const { result, run } = useInternetTest();

  const onWifi = network.type === NetworkStateType.WIFI;
  const typeLabel = (network.type && TYPE_LABELS[network.type]) ?? 'Unknown';

  return (
    <>
      <StatusRow
        label="Connection"
        value={typeLabel}
        status={onWifi ? 'good' : network.isConnected ? 'warn' : 'bad'}
      />
      <StatusRow
        label="Internet"
        value={
          result.state === 'running'
            ? 'Testing…'
            : result.state === 'ok'
              ? 'Working'
              : 'Not reachable'
        }
        status={result.state === 'ok' ? 'good' : result.state === 'failed' ? 'bad' : 'info'}
      />
      {result.state === 'ok' && (
        <StatusRow
          label="Response time"
          value={`${result.ms} ms`}
          status={result.ms < 500 ? 'good' : result.ms < 1500 ? 'warn' : 'bad'}
        />
      )}
      <Button
        title={result.state === 'running' ? 'Testing…' : 'Test again'}
        variant="tinted"
        disabled={result.state === 'running'}
        onPress={run}
      />
    </>
  );
}
