export type ServerResponseType<T> = {
  status: string
  data: T
}

export type PriceChartDataResponseType = {
  change?: string
  history: {
    price: number
    timestamp: number
  }[]
}

export type CoinDataType = {
  coin: {
    uuid: string
    symbol: string
    name: string
    iconUrl: string
    sparkline: string[]
    price: string
    change: string
    rank: string
  }
}
