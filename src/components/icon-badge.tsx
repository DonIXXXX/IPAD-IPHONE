import { LinearGradient } from 'expo-linear-gradient';
import { SymbolView, type AndroidSymbol, type SFSymbol } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

type IconBadgeProps = {
  icon: { ios: SFSymbol; android: AndroidSymbol };
  color: string;
  size?: number;
};

/** Glossy rounded tile with a white symbol, like an app icon. */
export function IconBadge({ icon, color, size = 48 }: IconBadgeProps) {
  const radius = size * 0.28;
  return (
    <View style={[styles.badge, { width: size, height: size, borderRadius: radius, backgroundColor: color, shadowColor: color }]}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.45)', 'rgba(255, 255, 255, 0)']}
        style={[styles.shine, { borderTopLeftRadius: radius, borderTopRightRadius: radius }]}
        pointerEvents="none"
      />
      <SymbolView
        name={{ ios: icon.ios, android: icon.android, web: icon.android }}
        tintColor="#ffffff"
        size={size * 0.52}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
});
