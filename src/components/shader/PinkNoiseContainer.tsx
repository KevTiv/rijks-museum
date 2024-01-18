import React, {
  useState,
  useEffect,
  ReactElement,
  useRef,
  useCallback,
} from 'react';
import {Shader, Canvas, Fill} from '@shopify/react-native-skia';
import {Dimensions, StyleSheet} from 'react-native';
import {MotiView as Box} from 'moti';
import {GLSLPinkShader} from './PinkNoiseShader';
import {useTheme} from '../../store';

type PinkNoiseContainerProps = {
  refreshRate?: number;
  children?: ReactElement;
  height?: number;
  reflectionSpeed?: number;
};

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

export const PinkNoiseContainer = ({
  refreshRate = 60,
  reflectionSpeed = 0.5,
  children,
  height,
}: PinkNoiseContainerProps) => {
  const [time, setTime] = useState(0);
  const requestRef = useRef<number>(); // Ref to store requestAnimationFrame ID

  const animate = useCallback(() => {
    setTime(prevTime => prevTime + reflectionSpeed / refreshRate);
    requestRef.current = requestAnimationFrame(animate);
  }, [reflectionSpeed, refreshRate]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  return (
    <>
      <Box style={styles.children}>{children}</Box>

      {GLSLPinkShader && (
        <Canvas style={[styles.canvas, {height: height ?? SCREEN_HEIGHT}]}>
          <Fill>
            <Shader
              source={GLSLPinkShader}
              uniforms={{
                time,
                resolution: [SCREEN_WIDTH, SCREEN_HEIGHT],
              }}
            />
          </Fill>
        </Canvas>
      )}
    </>
  );
};

const theme = useTheme.getState().theme;
const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    top: 0,
    left: 0,
    borderRadius: theme.sizes.md,
    zIndex: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    opacity: 1,
  },
  children: {
    zIndex: 2,
    padding: theme.sizes.md,
  },
});
