import { useTheme } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}

const data = [
  createData('00:00', 287),
  createData('03:00', 286),
  createData('06:00', 286),
  createData('09:00', 284),
  createData('12:00', 282),
  createData('15:00', 283),
  createData('18:00', 281),
  createData('21:00', 279),
  createData('24:00', 278),
];

export default function ExampleChart() {
  const theme = useTheme();
  return (
    <>
      <ResponsiveContainer width='90%' height='70%'>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey='time'
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position='left'
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Weight (lbs)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type='monotone'
            dataKey='amount'
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
