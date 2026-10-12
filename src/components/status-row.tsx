import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export type Status = 'good' | 'warn' | 'bad' | 'info';

export const StatusColors: Record<Status, string> = {
  good: '#30A46C',
  warn: '#F76B15',
  bad: '#E5484D',
  info: '#8B8D98',
};

type StatusRowProps = {
  label: string;
  value: string;
  status?: Status;
};

export function StatusRow({ label, value, status = 'info' }: StatusRowProps) {
  return (
    <View style={styles.row}>
      <View style={[styles.dot, { backgroundColor: StatusColors[status] }]} />
      <ThemedText style={styles.label}>{label}</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.value}>
        {value}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    flex: 1,
  },
  value: {
    textAlign: 'right',
    flexShrink: 1,
  },
});
