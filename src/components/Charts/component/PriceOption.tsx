import { Box, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { graphic } from 'echarts'
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
        <Typography ml={1}>Price: </Typography>
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

const PriceOption = (data: dataChartType) => {
  const dataMax = Math.max(...data.dataY.volume)
  const arrayTemp = new Array(dataMax.toString().length).fill(0)
  arrayTemp.unshift(5)
  let roundingNumber = dataMax * 10
  console.log(data.dataX)

  // const dataPriceMax = Math.max(...data.dataY.price)
  // const dataPriceMin = Math.min(...data.dataY.price)
  // const arrayPriceTemp = new Array(dataPriceMax.toString().length).fill(0)
  // arrayPriceTemp.unshift()
  // let roundingPriceNumber = Number(arrayTemp.join(''))
  // while (dataPriceMax < roundingPriceNumber / 2) {
  //   roundingPriceNumber /= 2
  // }
  // console.log(roundingNumber)

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
      pieces: [
        {
          gt: 0,
          lte: 5000,
          color: 'red',
        },
        {
          gt: 5000,
          lte: 10000,
          color: 'green',
        },
      ],
      outOfRange: {
        color: '#999',
      },
    },
    series: [
      {
        name: 'Price',
        type: 'line',
        symbolSize: 10,
        lineStyle: {
          width: 2,
        },
        emphasis: {
          focus: 'series',
        },
        smooth: false,
        symbol: 'none',
        stack: 'confidence-band',
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 0.5, [
            {
              offset: 0,
              color: 'green',
            },
            {
              offset: 1,
              color: '#0C1023',
            },
          ]),
          origin: 'start',
        },
        markLine: {
          silent: true,
          lineStyle: {
            color: 'black',
          },
          data: [
            {
              yAxis: 5000,
            },
            {
              yAxis: 10000,
            },
          ],
        },
        data: data.dataY.price,
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
        data: data.dataY.volume,
      },
    ],
  }
  return option
}

export { PriceOption }
