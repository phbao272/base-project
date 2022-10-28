import { Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

import { defaultPriceData } from '@/components/Charts/ChartCoin'
import { BarLineChart, dataChartType } from '@/components/Charts/component/BarLineChart'
import { parseDataChart } from '@/components/Charts/component/parseDataChart'
import { baseUrl, cryptoApiHeaders, defaultReferenceCurrency } from '@/constants'
import { CoinDataType, PriceChartDataResponseType, ServerResponseType } from '@/libs/types/apiChart'

export type CoinGraphType = {
  idCoin: string
}

const CoinGraph: React.FC<CoinGraphType> = ({ idCoin }) => {
  const [priceData, setPriceData] = useState<dataChartType>(defaultPriceData)
  const [coinData, setCoinData] = useState<CoinDataType | null>(null)

  const { isSuccess: isPriceResponseSuccess } = useQuery<
    ServerResponseType<PriceChartDataResponseType>
  >(
    [
      `${baseUrl}/coin/${idCoin}/history`,
      { referenceCurrencyUuid: defaultReferenceCurrency, timePeriod: '30d' },
      {
        headers: cryptoApiHeaders,
      },
    ],
    {
      onSuccess: (data) => {
        const dataParse = parseDataChart(data.data.history)
        setPriceData(dataParse)
      },
    },
  )

  const { isSuccess: isCoinDataSuccess } = useQuery<ServerResponseType<CoinDataType>>(
    [
      `${baseUrl}/coin/${idCoin}`,
      { referenceCurrencyUuid: defaultReferenceCurrency, timePeriod: '24h' },
      {
        headers: cryptoApiHeaders,
      },
    ],
    {
      onSuccess: (data) => {
        setCoinData(data.data)
      },
    },
  )

  return isCoinDataSuccess && isPriceResponseSuccess ? (
    <Stack height={280} border="1px solid white" borderRadius={1}>
      <Stack
        direction="row"
        justifyContent="space-between"
        px={2}
        py={3.5}
        sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        bgcolor="#191F3A"
      >
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Box
            component="img"
            sx={{
              height: 58,
              width: 58,
            }}
            alt="logo coin"
            src={coinData?.coin.iconUrl}
          ></Box>
          <Stack>
            <Typography color="white">{coinData?.coin.name}</Typography>
            <Typography color="white">
              {`${coinData?.coin.symbol} (USD) = ${Number(coinData?.coin.price).toFixed(3)} (${
                coinData?.coin.change
              })`}
            </Typography>
          </Stack>
        </Stack>
        <Typography color="#3861FB">More</Typography>
      </Stack>
      <Box overflow="hidden">
        <BarLineChart height={250} data={priceData} isLineGraph />
      </Box>
    </Stack>
  ) : (
    <></>
  )
}

export { CoinGraph }
