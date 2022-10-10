import { Box, BoxProps } from '@mui/material'
import { BarSeriesOption, DataZoomComponentOption, LineSeriesOption } from 'echarts'
import { BarChart as EBarChart, LineChart } from 'echarts/charts'
import {
  DataZoomComponent,
  GridComponent,
  GridComponentOption,
  ToolboxComponent,
  TooltipComponent,
  TooltipComponentOption,
  VisualMapComponent,
} from 'echarts/components'
import type { ComposeOption, ECharts } from 'echarts/core'
import { use } from 'echarts/core'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import {
  ToolboxComponentOption,
  TooltipOption,
  VisualMapComponentOption,
} from 'echarts/types/dist/shared'
import { forwardRef, useRef } from 'react'

import { CoreChart, CoreChartProps } from './Core'
import { MarketChartOption } from './MarketChartOption'
import { PriceOption } from './PriceOption'

use([
  TooltipComponent,
  EBarChart,
  CanvasRenderer,
  LabelLayout,
  GridComponent,
  LineChart,
  DataZoomComponent,
  ToolboxComponent,
  VisualMapComponent,
])

export type data = {
  year: string
  dataX: string[]
  dataY: {
    two: number[]
    four: number[]
  }
}

export type BarLineChartOption = ComposeOption<
  | TooltipComponentOption
  | BarSeriesOption
  | GridComponentOption
  | LineSeriesOption
  | TooltipOption
  | DataZoomComponentOption
  | ToolboxComponentOption
  | VisualMapComponentOption
>

type BarLineChartProps = BoxProps<'div', CoreChartProps<BarLineChartOption>> & {
  data: data
  isMarketOption?: boolean
  isCandleChart?: boolean
  isPriceOption?: boolean
}

const BarLineChart = forwardRef<ECharts, BarLineChartProps>(function Bar(props, ref) {
  const { data, isMarketOption, isCandleChart, isPriceOption, ...boxProps } = props

  const chartRef = useRef<ECharts>(null)

  return (
    <Box width="100%" {...boxProps}>
      {isMarketOption && <CoreChart options={MarketChartOption(data)} ref={chartRef} />}
      {isCandleChart && <CoreChart options={PriceOption(data)} ref={chartRef} />}
      {isPriceOption && <CoreChart options={PriceOption(data)} ref={chartRef} />}
    </Box>
  )
})

export { BarLineChart }
