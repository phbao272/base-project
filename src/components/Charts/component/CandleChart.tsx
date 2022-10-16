import ReactECharts from 'echarts-for-react'
import React from 'react'

const upColor = '#00da3c'
const downColor = '#ec0000'

const dataCandle = [
  ['2004-01-02', 10452.74, 10409.85, 10367.41, 10554.96, 168890000],
  ['2004-01-05', 10411.85, 10544.07, 10411.85, 10575.92, 221290000],
  ['2004-01-06', 10543.85, 10538.66, 10454.37, 10584.07, 191460000],
  ['2004-01-07', 10535.46, 10529.03, 10432, 10587.55, 225490000],
  ['2004-01-08', 10530.07, 10592.44, 10480.59, 10651.99, 237770000],
  ['2004-01-09', 10589.25, 10458.89, 10420.52, 10603.48, 223250000],
  ['2004-01-12', 10461.55, 10485.18, 10389.85, 10543.03, 197960000],
  ['2004-01-13', 10485.18, 10427.18, 10341.19, 10539.25, 197310000],
  ['2004-01-14', 10428.67, 10538.37, 10426.89, 10573.85, 186280000],
  ['2004-01-15', 10534.52, 10553.85, 10454.52, 10639.03, 260090000],
  ['2004-01-16', 10556.37, 10600.51, 10503.7, 10666.88, 254170000],
  ['2004-01-20', 10601.4, 10528.66, 10447.92, 10676.96, 224300000],
  ['2004-01-21', 10522.77, 10623.62, 10453.11, 10665.7, 214920000],
  ['2004-01-22', 10624.22, 10623.18, 10545.03, 10717.4, 219720000],
  ['2004-01-23', 10625.25, 10568.29, 10490.14, 10691.77, 234260000],
  ['2004-01-26', 10568, 10702.51, 10510.44, 10725.18, 186170000],
]

var data = splitData(dataCandle as number[][])
function splitData(rawData: number[][]) {
  let categoryData = []
  let values = []
  let volumes = []
  for (let i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0])
    values.push(rawData[i])
    volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1])
  }

  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes,
  }
}
function calculateMA(dayCount: number, data: { values: number[][] }) {
  var result = []
  for (var i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-')
      continue
    }
    var sum = 0
    for (var j = 0; j < dayCount; j++) {
      sum += data.values[i - j][1]
    }
    result.push(+(sum / dayCount).toFixed(3))
  }
  return result
}

const option = {
  animation: false,
  legend: {
    top: 10,
    left: 'center',
    data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30'],
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textStyle: {
      color: '#000',
    },
  },
  axisPointer: {
    link: [
      {
        xAxisIndex: 'all',
      },
    ],
    label: {
      backgroundColor: '#777',
    },
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: false,
      },
      brush: {
        type: ['lineX', 'clear'],
      },
    },
  },
  brush: {
    xAxisIndex: 'all',
    brushLink: 'all',
    outOfBrush: {
      colorAlpha: 0.1,
    },
  },
  visualMap: {
    show: false,
    seriesIndex: 5,
    dimension: 2,
    pieces: [
      {
        value: 1,
        color: downColor,
      },
      {
        value: -1,
        color: upColor,
      },
    ],
  },
  grid: [
    {
      left: '10%',
      right: '8%',
      height: '50%',
    },
    {
      left: '10%',
      right: '8%',
      top: '63%',
      height: '16%',
    },
  ],
  xAxis: [
    {
      type: 'category',
      data: data.categoryData,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: 'dataMin',
      max: 'dataMax',
      axisPointer: {
        z: 100,
      },
    },
    {
      type: 'category',
      gridIndex: 1,
      data: data.categoryData,
      boundaryGap: false,
      axisLine: { onZero: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      min: 'dataMin',
      max: 'dataMax',
    },
  ],
  yAxis: [
    {
      scale: true,
      splitArea: {
        show: true,
      },
    },
    {
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
  ],
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: [0, 1],
      start: 98,
      end: 100,
    },
    {
      show: true,
      xAxisIndex: [0, 1],
      type: 'slider',
      top: '85%',
      start: 98,
      end: 100,
    },
  ],
  series: [
    {
      name: 'Dow-Jones index',
      type: 'candlestick',
      data: data.values,
      itemStyle: {
        color: upColor,
        color0: downColor,
        borderColor: undefined,
        borderColor0: undefined,
      },
      tooltip: {
        formatter: function (param: any) {
          param = param[0]
          return [
            'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
            'Open: ' + param.data[0] + '<br/>',
            'Close: ' + param.data[1] + '<br/>',
            'Lowest: ' + param.data[2] + '<br/>',
            'Highest: ' + param.data[3] + '<br/>',
          ].join('')
        },
      },
      position: function (
        pos: number[],
        params: any,
        el: any,
        elRect: any,
        size: { viewSize: number[] },
      ) {
        const obj: Record<string, number> = {
          top: 10,
        }
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
        return obj
      },
    },
    {
      name: 'MA5',
      type: 'line',
      data: calculateMA(5, data),
      smooth: true,
      lineStyle: {
        opacity: 0.5,
      },
    },
    {
      name: 'MA10',
      type: 'line',
      data: calculateMA(10, data),
      smooth: true,
      lineStyle: {
        opacity: 0.5,
      },
    },
    {
      name: 'MA20',
      type: 'line',
      data: calculateMA(20, data),
      smooth: true,
      lineStyle: {
        opacity: 0.5,
      },
    },
    {
      name: 'MA30',
      type: 'line',
      data: calculateMA(30, data),
      smooth: true,
      lineStyle: {
        opacity: 0.5,
      },
    },
    {
      name: 'Volume',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: data.volumes,
    },
  ],
}

const CandleChart = () => {
  return (
    <div>
      <ReactECharts option={option} style={{ height: '500px', width: '100%' }} lazyUpdate={true} />
    </div>
  )
}

export { CandleChart }
