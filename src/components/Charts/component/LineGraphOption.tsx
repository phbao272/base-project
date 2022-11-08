import { BarLineChartOption, dataChartType } from './BarLineChart'

const LineGraphOption = (data: dataChartType, colorLine?: string) => {
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
        min: function (value) {
          return value.min - (value.min * 5) / 100
        },
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
          color: colorLine,
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
