import React from 'react';
import {MotiView as Box} from 'moti';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import {ReactElement} from 'react';
import {useTheme} from '../store';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type GestureContainerProps = {
  children: ReactElement;
  width?: number;
  height?: number;
};
export const GestureContainer = ({
  children,
  width = SCREEN_WIDTH * 0.9,
  height = 250,
}: GestureContainerProps) => {
  const {theme} = useTheme();
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(event => {
      rotateX.value = withTiming(
        interpolate(
          event.y,
          [0, height],
          [theme.sizes.lg, -theme.sizes.lg],
          Extrapolation.CLAMP,
        ),
      );
      rotateY.value = withTiming(
        interpolate(
          event.x,
          [0, width],
          [-theme.sizes.lg, theme.sizes.lg],
          Extrapolation.CLAMP,
        ),
      );
    })
    .onUpdate(event => {
      // topLeft (10deg, -10deg)
      // topRight (10deg, 10deg)
      // bottomRight (-10deg, 10deg)
      // bottomLeft (-10deg, -10deg)

      rotateX.value = interpolate(
        event.y,
        [0, height],
        [theme.sizes.lg, -theme.sizes.lg],
        Extrapolation.CLAMP,
      );
      rotateY.value = interpolate(
        event.x,
        [0, width],
        [-theme.sizes.lg, theme.sizes.lg],
        Extrapolation.CLAMP,
      );
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });

  const rStyle = useAnimatedStyle(() => {
    const rotateXvalue = `${rotateX.value}deg`;
    const rotateYvalue = `${rotateY.value}deg`;

    return {
      flex: 1,
      transform: [
        {
          perspective: 300,
        },
        {rotateX: rotateXvalue},
        {rotateY: rotateYvalue},
      ],
    };
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Box style={rStyle}>{children}</Box>
    </GestureDetector>
  );
};
