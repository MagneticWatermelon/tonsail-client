import { MantineTheme, useMantineTheme } from '@mantine/core';
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  buildChartTheme,
  Tooltip,
  XYChart,
  XYChartTheme
} from '@visx/xychart';
import { DateTime } from 'luxon';
import { GlyphDot } from '@visx/glyph';
import { RenderTooltipGlyphProps } from '@visx/xychart/lib/components/Tooltip';
import { RunMetric } from '../types';
import { UseQueryResult } from '@tanstack/react-query';

const lightTheme = (theme: MantineTheme) =>
  buildChartTheme({
    backgroundColor: '#A5D8FF',
    colors: [theme.colors.green[6], theme.colors.blue[6], theme.colors.yellow[6]],
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

const accessors = {
  // @ts-ignore
  xAccessor: (d) => DateTime.fromISO(d.ts),
  // @ts-ignore
  yAccessor: (d) => d.value
};

type MetricChartProps = {
  metricList: UseQueryResult<RunMetric, unknown>[];
};
export default function MetricChart({ metricList }: MetricChartProps) {
  const theme = useMantineTheme();

  return (
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
        {metricList.map((metric, index) => {
          if (metric.data) {
            return (
              <AnimatedLineSeries
                key={index}
                dataKey={`Metrics ${index}`}
                fillOpacity={0.2}
                data={metric.data.values}
                xAccessor={accessors.xAccessor}
                yAccessor={accessors.yAccessor}
              />
            );
          }
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
  );
}
