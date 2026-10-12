import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { Colors, Glass, Spacing } from '@/constants/theme';

/** Translucent card with a glossy highlight across the top. */
export function GlassCard({ style, children, ...rest }: ViewProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      <LinearGradient colors={Glass.shine} style={styles.shine} pointerEvents="none" />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.backgroundElement,
    borderColor: Glass.border,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: Spacing.four,
    padding: Spacing.three,
    overflow: 'hidden',
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '55%',
  },
});
