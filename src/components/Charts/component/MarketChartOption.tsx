import { Box, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import {
  CallbackDataParams,
  TooltipFormatterCallback,
  TopLevelFormatterParams,
} from 'echarts/types/dist/shared'
import ReactDOMServer from 'react-dom/server'

import { BarLineChartOption, dataChartType } from './BarLineChart'

function Tooltip(props: any) {
  return (
    <Box style={{ width: 230, height: 120, borderRadius: 20 }}>
      <Stack direction="row" justifyContent="space-around" mt={2}>
        {/* <Typography>{props[1].name}</Typography> */}
        <Typography>{props[0].name}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" mt={2}>
        <Box
          sx={{ borderRadius: '100%', width: '15px', height: '15px', background: 'green', ml: 2 }}
        ></Box>
        <Typography ml={1}>MarketCap: </Typography>
        <Typography fontWeight={700}>${props[0].value.toFixed(4)}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" mt={1}>
        <Box
          sx={{ borderRadius: '100%', width: '15px', height: '15px', background: 'green', ml: 2 }}
        ></Box>
        <Typography ml={1}>Sparkline: </Typography>
        <Typography fontWeight={700}>${props[1].value.toFixed(4)}</Typography>
      </Stack>
    </Box>
  )
}

const MarketChartOption = (data: dataChartType) => {
  const dataMax = Math.max(...data.dataY.volume)
  const arrayTemp = new Array(dataMax.toString().length).fill(0)
  arrayTemp.unshift(5)
  let roundingNumber = dataMax * 10

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
        data: data.dataX,
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
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
        show: true,
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
    visualMap: {
      top: 2000,
      right: 10,
    },
    series: [
      {
        name: 'Price',
        type: 'line',
        symbolSize: 10,
        lineStyle: {
          width: 2,
          color: 'blue',
        },
        emphasis: {
          focus: 'series',
        },
        smooth: false,
        symbol: 'none',
        stack: 'confidence-band',
        data: data.dataY.price,
      },
      {
        name: 'Volume',
        type: 'bar',
        yAxisIndex: 1,

        data: data.dataY.volume,
      },
    ],
  }
  return option
}

export { MarketChartOption }
