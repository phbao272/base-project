import { BarLineChartOption, dataChartType } from './BarLineChart'

export const DataX = new Array(498).fill('10:15 AM')

const LineGraphOption = (data: dataChartType) => {
  const option: BarLineChartOption = {
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false,
          alignWithLabel: true,
          length: 8,
          lineStyle: {
            color: 'grey',
          },
        },
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        data: data.dataX,
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],

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
    ],
  }
  return option
}

export { LineGraphOption }
