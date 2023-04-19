import { Flex, MantineTheme, Text, useMantineTheme } from '@mantine/core';
import {
  AnimatedAreaSeries,
  AnimatedAxis,
  AnimatedGrid,
  buildChartTheme,
  Tooltip,
  XYChart,
  XYChartTheme
} from '@visx/xychart';
import { Stage, useStages } from '../../stores/StagesStore';
import { formatDuration, parseDuration } from '../../util/timeFormat';

const lightTheme = (theme: MantineTheme) =>
  buildChartTheme({
    backgroundColor: theme.colors.nordicNoir[0],
    colors: [theme.colors.nordicNoir[6]],
    gridColor: '#336d88',
    gridColorDark: '#1d1b38',
    svgLabelBig: { fill: '#1d1b38' },
    tickLength: 4
  });

const darkTheme = (theme: MantineTheme) =>
  buildChartTheme({
    backgroundColor: theme.colors.spaceCadet[6],
    colors: [theme.colors.limeZest[5]],
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

const accessors = {
  // @ts-ignore
  xAccessor: (d) => d.x,
  // @ts-ignore
  yAccessor: (d) => d.y
};

function chartTheme(theme: MantineTheme): XYChartTheme {
  if (theme.colorScheme === 'dark') {
    return darkTheme(theme);
  } else {
    return lightTheme(theme);
  }
}

function formatUserTick(value: any) {
  return `${value} VU`;
}

function parseStageData(stages: Stage[]) {
  let data = [];
  let prev = { x: 0, y: 0 };
  for (let stage of stages) {
    let d = parseDuration(stage.duration);
    let u = stage.userAmount;
    data.push({ x: prev.x, y: u }, { x: d + prev.x, y: u });
    prev = { x: d + prev.x, y: u };
  }
  return data;
}

function getTotalTime(stages: Stage[]) {
  let totalTime = 0;
  for (let stage of stages) {
    let d = parseDuration(stage.duration);
    totalTime += d;
  }
  return `${totalTime}`;
}

export default function StageChart() {
  const theme = useMantineTheme();
  const stages = useStages();

  return (
    <Flex style={{ flex: '1 1 100%', flexDirection: 'column', height: 300, minWidth: 0 }}>
      <Text>Total duration: {formatDuration(getTotalTime(stages))}</Text>
      <XYChart
        theme={chartTheme(theme)}
        height={300}
        xScale={{ type: 'linear' }}
        yScale={{ type: 'linear', nice: true }}>
        <AnimatedAxis
          animationTrajectory="min"
          orientation="bottom"
          tickFormat={formatDuration}
          strokeWidth={0.5}
        />
        <AnimatedAxis
          animationTrajectory="min"
          orientation="left"
          numTicks={5}
          tickFormat={formatUserTick}
          strokeWidth={0.5}
          hideTicks
          hideZero
        />
        <AnimatedGrid columns={false} rows={false} />
        <AnimatedAreaSeries
          dataKey="Stages"
          fillOpacity={0.2}
          data={parseStageData(stages)}
          xAccessor={(d) => d.x}
          yAccessor={(d) => d.y}
        />
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          renderTooltip={({ tooltipData, colorScale }) => {
            if (
              tooltipData &&
              tooltipData.nearestDatum &&
              tooltipData.nearestDatum.index % 2 == 0 &&
              colorScale
            ) {
              return (
                <div>
                  {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                  {' users after '}
                  {formatDuration(accessors.xAccessor(tooltipData.nearestDatum.datum))}
                </div>
              );
            }
          }}
        />
      </XYChart>
    </Flex>
  );
}
