import Svg, {Line, Polyline} from 'react-native-svg';

export const ArrowForward = ({
  width = 24,
  height = 24,
  stroke = 'currentColor',
  strokeWidth = 24,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox={'0 0 24 24'}
    fill="none"
    stroke={stroke}
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round">
    <Line x1="5" y1="12" x2="19" y2="12" />
    <Polyline points="12 5 19 12 12 19" />
  </Svg>
);
