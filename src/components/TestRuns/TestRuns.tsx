import { Button, Flex, MantineTheme, useMantineTheme } from '@mantine/core';
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  buildChartTheme,
  GlyphProps,
  Tooltip,
  XYChart,
  XYChartTheme
} from '@visx/xychart';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useTitleActions } from '../../stores/AppTitleStore';
import { useListState } from '@mantine/hooks';
import { GlyphDot } from '@visx/glyph';
import { RenderTooltipGlyphProps } from '@visx/xychart/lib/components/Tooltip';

interface RunMetric {
  name: string;
  run_id: string;
  values: Data[];
}

interface Data {
  ts: string;
  value: number;
}

const lightTheme = (theme: MantineTheme) =>
  buildChartTheme({
    backgroundColor: '#A5D8FF',
    colors: ['#228BE6'],
    gridColor: '#336d88',
    gridColorDark: '#1d1b38',
    svgLabelBig: { fill: '#1d1b38' },
    tickLength: 4
  });

const darkTheme = (theme: MantineTheme) =>
  buildChartTheme({
    backgroundColor: theme.colors.spaceCadet[6],
    colors: [theme.colors.green[6], theme.colors.blue[6], theme.colors.yellow[6]],
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

function chartTheme(theme: MantineTheme): XYChartTheme {
  if (theme.colorScheme == 'dark') {
    return darkTheme(theme);
  } else {
    return lightTheme(theme);
  }
}

const values2 = [
  {
    ts: '2023-03-15T00:00:00',
    value: 19.91468
  },
  {
    ts: '2023-03-15T00:00:01.700',
    value: 47.05776
  },
  {
    ts: '2023-03-15T00:00:02.100',
    value: 15.57617
  },
  {
    ts: '2023-03-15T00:00:03.600',
    value: 42.22703
  },
  {
    ts: '2023-03-15T00:00:04.700',
    value: 49.53531
  },
  {
    ts: '2023-03-15T00:00:04.900',
    value: 43.84927
  },
  {
    ts: '2023-03-15T00:00:05.500',
    value: 41.082184
  },
  {
    ts: '2023-03-15T00:00:05.800',
    value: 45.77612
  },
  {
    ts: '2023-03-15T00:00:06.500',
    value: 10.15681
  },
  {
    ts: '2023-03-15T00:00:07.200',
    value: 43.79221
  }
];

function createTimeSeries() {
  let series = [];
  for (let i = 0; i < 10; i++) {
    let val = Math.floor(Math.random() * 100) + 20;
    series.push({ ts: values2[i].ts, value: val });
  }
  return { name: '', run_id: '', values: series };
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
  const [timeSeries, tsHandlers] = useListState([metrics]);
  const { setTitle } = useTitleActions();
  useEffect(() => {
    setTitle('Run with ID');
  }, []);

  return (
    <>
      <Button
        color="limeZest"
        variant="outline"
        onClick={() => {
          tsHandlers.append(createTimeSeries());
        }}>
        Add Time Series
      </Button>
      <Flex style={{ flex: '1 1 100%', flexDirection: 'column', height: 400, minWidth: 0 }}>
        <XYChart
          theme={chartTheme(theme)}
          xScale={{ type: 'time' }}
          yScale={{ type: 'linear', nice: true }}>
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
          <>
            {timeSeries.map((metric, index) => {
              return (
                <AnimatedLineSeries
                  dataKey={`Metrics ${index}`}
                  fillOpacity={0.2}
                  data={metric.values}
                  xAccessor={accessors.xAccessor}
                  yAccessor={accessors.yAccessor}
                />
              );
            })}
          </>
          <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showVerticalCrosshair
            showDatumGlyph
            showSeriesGlyphs
            renderGlyph={({
              x,
              y,
              size,
              color,
              onPointerMove,
              onPointerOut,
              onPointerUp
            }: RenderTooltipGlyphProps<{ date: string; value: number }>) => {
              const handlers = { onPointerMove, onPointerOut, onPointerUp };
              return (
                <GlyphDot
                  left={x}
                  top={y}
                  stroke={chartTheme(theme).gridStyles.stroke}
                  fill={color}
                  r={size}
                  {...handlers}
                />
              );
            }}
            renderTooltip={({ tooltipData, colorScale }) => {
              if (tooltipData && tooltipData.nearestDatum && colorScale) {
                return (
                  <>
                    {/** date */}
                    {accessors
                      .xAccessor(tooltipData.nearestDatum.datum)
                      .toLocaleString(DateTime.DATETIME_MED)}
                    <br />
                    <br />
                    {/** temperatures */}
                    {Object.keys(tooltipData.datumByKey).map((value) => {
                      const metricValue = accessors.yAccessor(tooltipData.datumByKey[value].datum);

                      return (
                        <div key={value}>
                          <em
                            style={{
                              color: colorScale?.(value),
                              textDecoration:
                                tooltipData.nearestDatum?.key === value ? 'underline' : undefined
                            }}>
                            {value}
                          </em>{' '}
                          {metricValue == null || Number.isNaN(metricValue)
                            ? '–'
                            : `${metricValue} rps`}
                        </div>
                      );
                    })}
                  </>
                );
              }
            }}
          />
        </XYChart>
      </Flex>
    </>
  );
}
