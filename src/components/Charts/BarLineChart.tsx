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
} from 'echarts/components'
import type { ComposeOption, ECharts } from 'echarts/core'
import { use } from 'echarts/core'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { ToolboxComponentOption, TooltipOption } from 'echarts/types/dist/shared'
import { forwardRef, useRef } from 'react'

import { ChartOptions } from './ChartOption'
import { CoreChart, CoreChartProps } from './Core'

use([
  TooltipComponent,
  EBarChart,
  CanvasRenderer,
  LabelLayout,
  GridComponent,
  LineChart,
  DataZoomComponent,
  ToolboxComponent,
])

export type data = {
  year: string
  dataX: string[]
  dataY: {
    two: number[]
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
>

type BarLineChartProps = BoxProps<'div', CoreChartProps<BarLineChartOption>> & { data: data }

const BarLineChart = forwardRef<ECharts, BarLineChartProps>(function Bar(props, ref) {
  const { data, ...boxProps } = props

  const chartRef = useRef<ECharts>(null)

  return (
    <Box width="100%" {...boxProps}>
      <CoreChart options={ChartOptions(data)} ref={chartRef} />
    </Box>
  )
})

export { BarLineChart }
