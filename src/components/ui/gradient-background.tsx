import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { BackgroundGradient } from '@/constants/theme';

/** Full-screen ocean-teal gradient with a soft glow, drawn behind a screen's content. */
export function GradientBackground({ style, children, ...rest }: ViewProps) {
  return (
    <View style={[styles.fill, style]} {...rest}>
      <LinearGradient
        colors={BackgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(94, 234, 212, 0.25)', 'rgba(94, 234, 212, 0)']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
