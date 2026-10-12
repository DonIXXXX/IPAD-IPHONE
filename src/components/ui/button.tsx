import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { Spacing } from '@/constants/theme';

type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  title: string;
  color?: string;
  variant?: 'filled' | 'tinted';
};

export function Button({ title, color = '#14B8A6', variant = 'filled', disabled, ...rest }: ButtonProps) {
  const filled = variant === 'filled';
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        filled ? { backgroundColor: color } : styles.tinted,
        (pressed || disabled) && styles.dimmed,
      ]}
      {...rest}>
      {filled && (
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0)']}
          style={styles.shine}
          pointerEvents="none"
        />
      )}
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.two + Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.five,
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  tinted: {
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 600,
  },
  dimmed: {
    opacity: 0.6,
  },
});
