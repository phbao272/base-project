import { Box, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { graphic } from 'echarts'
import {
  CallbackDataParams,
  TooltipFormatterCallback,
  TopLevelFormatterParams,
} from 'echarts/types/dist/shared'
import ReactDOMServer from 'react-dom/server'

import { BarLineChartOption, data } from './BarLineChart'

export const DataX = new Array(498).fill('10:15 AM')

export const DataY = {
  two: new Array(498).fill(400),
  four: new Array(498).fill(0).map(() => Math.floor(Math.random() * (69 - 40 + 1)) + 40),
}

function Tooltip(props: any) {
  return (
    <Box style={{ width: 200, height: 120, borderRadius: 20 }}>
      <Stack direction="row" justifyContent="space-around" mt={2}>
        <Typography>19/9/2021</Typography>
        <Typography>{props[0].name}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" mt={2}>
        <Box
          sx={{ borderRadius: '100%', width: '15px', height: '15px', background: 'green', ml: 2 }}
        ></Box>
        <Typography ml={1}>Price: </Typography>
        <Typography fontWeight={700}>${props[0].value}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" mt={1}>
        <Box
          sx={{ borderRadius: '100%', width: '15px', height: '15px', background: 'green', ml: 2 }}
        ></Box>
        <Typography ml={1}>Volume: </Typography>
        <Typography fontWeight={700}>${props[1].value}B</Typography>
      </Stack>
    </Box>
  )
}

const ChartOptions = (data: data) => {
  const dataMax = Math.max(...data.dataY.two)
  const arrayTemp = new Array(dataMax.toString().length).fill(0)
  arrayTemp.unshift(5)
  let roundingNumber = Number(arrayTemp.join(''))

  const option: BarLineChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
      formatter: ((params: CallbackDataParams[]) => {
        return ReactDOMServer.renderToStaticMarkup(<Tooltip {...params} />)
      }) as TooltipFormatterCallback<TopLevelFormatterParams>,
      borderRadius: 0,
      padding: 0,
    },

    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: true,
          alignWithLabel: true,
          length: 8,
          lineStyle: {
            color: 'grey',
          },
        },
        axisLabel: {
          color: 'grey',
          fontWeight: 700,
          fontSize: 14,
          margin: 18,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'lightgrey',
            width: 1,
            type: 'solid',
          },
        },
        data: DataX,
      },
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 100,
        interval: 10,
        axisLabel: {
          formatter: (value: number) => {
            return value + 'k'
          },
          color: 'grey',
          fontSize: 14,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'lightgrey',
            width: 1,
            type: 'solid',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: [
              'white',
              'white',
              'white',
              'lightgrey',
              'white',
              'lightgrey',
              'white',
              'white',
              'white',
              'white',
            ],
          },
        },
      },
      {
        type: 'value',
        show: false,
        max: roundingNumber,
        interval: roundingNumber / 10,
        axisLabel: {
          color: 'black',
          fontSize: 14,
          formatter: (value: number) => {
            switch (value) {
              case 0:
              case (roundingNumber * 3) / 10:
              case (roundingNumber * 5) / 10:
                return value.toString()
              case roundingNumber:
                return value + 'B'

              default:
                return ''
            }
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'grey',
            width: 1,
            type: 'solid',
          },
        },
        splitLine: {
          show: false,
        },
      },
    ],
    dataZoom: [
      {
        show: true,
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: 'Price',
        type: 'line',
        symbolSize: 10,

        lineStyle: {
          width: 2,
          color: 'green',
        },
        emphasis: {
          focus: 'series',
        },
        smooth: false,
        symbol: 'none',
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'lightgreen',
            },
            {
              offset: 1,
              color: 'white',
            },
          ]),
          origin: 'start',
        },
        data: DataY.four,
      },
      {
        name: 'Volume',
        type: 'bar',
        yAxisIndex: 1,
        itemStyle: {
          borderRadius: [2, 2, 0, 0],
        },
        emphasis: {
          focus: 'series',
        },
        data: DataY.two,
      },
    ],
  }
  return option
}

export { ChartOptions }
