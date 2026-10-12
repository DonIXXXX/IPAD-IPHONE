import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { Spacing } from '@/constants/theme';

type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  title: string;
  color?: string;
  variant?: 'filled' | 'tinted';
};

export function Button({ title, color = '#208AEF', variant = 'filled', disabled, ...rest }: ButtonProps) {
  const filled = variant === 'filled';
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: filled ? color : `${color}22` },
        (pressed || disabled) && styles.dimmed,
      ]}
      {...rest}>
      <Text style={[styles.title, { color: filled ? '#ffffff' : color }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.two + Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  dimmed: {
    opacity: 0.6,
  },
});
