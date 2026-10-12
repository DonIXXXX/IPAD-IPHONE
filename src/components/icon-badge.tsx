import { SymbolView, type AndroidSymbol, type SFSymbol } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

type IconBadgeProps = {
  icon: { ios: SFSymbol; android: AndroidSymbol };
  color: string;
  size?: number;
};

export function IconBadge({ icon, color, size = 44 }: IconBadgeProps) {
  return (
    <View style={[styles.badge, { width: size, height: size, borderRadius: size / 4, backgroundColor: color }]}>
      <SymbolView
        name={{ ios: icon.ios, android: icon.android, web: icon.android }}
        tintColor="#ffffff"
        size={size * 0.55}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
