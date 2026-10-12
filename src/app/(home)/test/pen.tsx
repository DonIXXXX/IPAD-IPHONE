import { useState } from 'react';
import { StyleSheet, View, type GestureResponderEvent } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { StatusRow } from '@/components/status-row';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { GradientBackground } from '@/components/ui/gradient-background';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const INK = '#5EEAD4';

type Point = { x: number; y: number };

function toPath(points: Point[]) {
  if (points.length === 0) return '';
  const [first, ...rest] = points;
  // A single tap still draws a visible dot.
  if (rest.length === 0) return `M${first.x} ${first.y} l0.1 0`;
  return `M${first.x} ${first.y} ` + rest.map((p) => `L${p.x} ${p.y}`).join(' ');
}

export default function PenTestScreen() {
  const theme = useTheme();
  const [strokes, setStrokes] = useState<string[]>([]);
  const [current, setCurrent] = useState<Point[]>([]);
  const [pressure, setPressure] = useState<number | null>(null);

  const readPoint = (event: GestureResponderEvent) => {
    const { locationX, locationY, force } = event.nativeEvent;
    // iOS reports touch force for Apple Pencil; fingers usually report 0.
    if (typeof force === 'number' && force > 0) setPressure(force);
    return { x: locationX, y: locationY };
  };

  const endStroke = () => {
    if (current.length > 0) setStrokes((prev) => [...prev, toPath(current)]);
    setCurrent([]);
  };

  const clear = () => {
    setStrokes([]);
    setPressure(null);
  };

  return (
    <GradientBackground>
      <View
        style={[styles.pad, { borderColor: theme.backgroundSelected }]}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
        onResponderGrant={(event) => setCurrent([readPoint(event)])}
        onResponderMove={(event) => {
          const point = readPoint(event);
          setCurrent((prev) => [...prev, point]);
        }}
        onResponderRelease={endStroke}
        onResponderTerminate={endStroke}>
        <Svg style={StyleSheet.absoluteFill}>
          {strokes.map((d, i) => (
            <Path key={i} d={d} stroke={INK} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          ))}
          {current.length > 0 && (
            <Path d={toPath(current)} stroke={INK} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          )}
        </Svg>
        {strokes.length === 0 && current.length === 0 && (
          <ThemedText themeColor="textSecondary" style={styles.placeholder} pointerEvents="none">
            Draw here with your Pencil
          </ThemedText>
        )}
      </View>

      <View style={styles.panel}>
        <StatusRow
          label="Lines drawn"
          value={String(strokes.length)}
          status={strokes.length > 0 ? 'good' : 'info'}
        />
        <StatusRow
          label="Pressure detected"
          value={pressure === null ? 'Not yet' : `Yes (${pressure.toFixed(2)})`}
          status={pressure === null ? 'info' : 'good'}
        />
        <ThemedText type="small" themeColor="textSecondary">
          Draw slow and fast lines across the whole pad. Look for gaps, lag or lines that don’t follow the tip. Pressure
          should appear when drawing with Apple Pencil.
        </ThemedText>
        <Button title="Clear" variant="tinted" color={INK} onPress={clear} />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  pad: {
    flex: 1,
    margin: Spacing.three,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: Spacing.three,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    position: 'absolute',
  },
  panel: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.two,
  },
});
