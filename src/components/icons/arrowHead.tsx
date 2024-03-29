import {StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export const ArrowHead = ({
  width = 30,
  height = 30,
  color = 'currentColor',
}) => {
  return (
    <Svg
      style={styles.arrowLeft}
      height={height}
      width={width}
      viewBox="0 0 448 512">
      <Path
        fill={color}
        d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  arrowLeft: {
    transform: [
      {
        rotate: '-90deg',
      },
    ],
  },
});
