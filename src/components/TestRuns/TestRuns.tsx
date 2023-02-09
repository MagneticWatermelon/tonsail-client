import { ColorScheme, Container, Flex, useMantineTheme } from '@mantine/core';
import {
  AnimatedAreaSeries,
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  buildChartTheme,
  Tooltip,
  XYChart,
  XYChartTheme
} from '@visx/xychart';
import { DateTime } from 'luxon';
import { useLoaderData } from 'react-router-dom';

interface RunMetric {
  name: string;
  run_id: string;
  values: Data[];
}

interface Data {
  ts: string;
  value: number;
}

const lightTheme = buildChartTheme({
  backgroundColor: '#A5D8FF',
  colors: ['#228BE6'],
  gridColor: '#336d88',
  gridColorDark: '#1d1b38',
  svgLabelBig: { fill: '#1d1b38' },
  tickLength: 4
});

const darkTheme = buildChartTheme({
  backgroundColor: '#222',
  colors: ['#228BE6'],
  tickLength: 4,
  svgLabelSmall: {
    fill: '#e9ecef'
  },
  svgLabelBig: {
    fill: '#f8f9fa'
  },
  gridColor: '#e9ecef',
  gridColorDark: '#f1f3f5'
});

function chartTheme(scheme: ColorScheme): XYChartTheme {
  if (scheme === 'dark') {
    return darkTheme;
  } else {
    return lightTheme;
  }
}

const accessors = {
  // @ts-ignore
  xAccessor: (d) => DateTime.fromISO(d.ts),
  // @ts-ignore
  yAccessor: (d) => d.value
};

export default function TestRuns() {
  const theme = useMantineTheme();
  const metrics = useLoaderData() as RunMetric;
  return (
    <Flex style={{ flex: '1 1 100%', flexDirection: 'column', height: 400, minWidth: 0 }}>
      <XYChart
        theme={chartTheme(theme.colorScheme)}
        xScale={{ type: 'time' }}
        yScale={{ type: 'linear', nice: true }}
      >
        <AnimatedAxis
          tickFormat={(date: Date) => {
            return DateTime.fromJSDate(date).toLocaleString(DateTime.TIME_24_WITH_SECONDS);
          }}
          numTicks={7}
          animationTrajectory="min"
          orientation="bottom"
          strokeWidth={0.5}
        />
        <AnimatedAxis
          animationTrajectory="min"
          orientation="left"
          numTicks={5}
          strokeWidth={0.5}
          hideTicks
          hideZero
        />
        <AnimatedGrid columns={false} rows={false} />
        <AnimatedLineSeries
          dataKey="Metrics"
          fillOpacity={0.2}
          data={metrics.values}
          xAccessor={accessors.xAccessor}
          yAccessor={accessors.yAccessor}
        />
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          renderTooltip={({ tooltipData, colorScale }) => {
            if (tooltipData && tooltipData.nearestDatum && colorScale) {
              return (
                <div>
                  <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                    {tooltipData.nearestDatum.key}
                  </div>
                  {accessors
                    .xAccessor(tooltipData.nearestDatum.datum)
                    .toLocaleString(DateTime.DATETIME_MED)}
                  {', '}
                  {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                </div>
              );
            }
          }}
        />
      </XYChart>
    </Flex>
  );
}
