const parseDataChart = (
  data: {
    price: number
    timestamp: number
  }[],
) => {
  const seriesTime = data.map((item) => {
    return new Date(item.timestamp * 1000).toLocaleDateString('en-US')
  })

  const seriesPrice = data.map((item) => {
    return Number(item.price)
  })
  return {
    dataX: seriesTime,
    dataY: {
      price: seriesPrice,
      volume: [],
    },
  }
}

const parseVolumeData = (data: string[], priceDataLength: number) => {
  const remainder = priceDataLength % data.length
  const numberTime = Math.round(priceDataLength / data.length)

  const arrayTemp = new Array(priceDataLength - remainder).fill('')
  const volumeData: number[] = []

  data.forEach((item, sparkIndex) => {
    arrayTemp.forEach((item, _index) => {
      if (sparkIndex * numberTime <= _index && _index < (sparkIndex + 1) * numberTime) {
        volumeData.push(Number(data[sparkIndex]))
      }
    })
  })

  let temp = 0
  while (temp < remainder) {
    volumeData.push(Number(data[0]))
    temp++
  }
  return volumeData
}

export { parseDataChart, parseVolumeData }
