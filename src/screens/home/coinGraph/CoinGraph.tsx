import { Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'

import { TableSkeleton } from '@/components'
import { defaultPriceData } from '@/components/Charts/ChartCoin'
import { BarLineChart, dataChartType } from '@/components/Charts/component/BarLineChart'
import { parseDataChart } from '@/components/Charts/component/parseDataChart'
import { baseUrl, cryptoApiHeaders, defaultReferenceCurrency } from '@/constants'
import { ICoin, ICoinLaravel } from '@/libs/types'
import { CoinDataType, PriceChartDataResponseType, ServerResponseType } from '@/libs/types/apiChart'

export type CoinGraphType = {
  idCoin: string
  coin: ICoin
}

const CoinGraph: React.FC<CoinGraphType> = ({ idCoin, coin }) => {
  const { t } = useTranslation()
  const [priceData, setPriceData] = useState<dataChartType>(defaultPriceData)
  const [coinData, setCoinData] = useState<CoinDataType | null>(null)

  useQuery<ICoinLaravel>([`coin/${coin.id}`], {
    onSuccess(data) {
      console.log('uuid', data.uuid)
    },
  })

  const { isFetching: isPriceResponseLoading, refetch } = useQuery<
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

  const { isFetching: isCoinDataLoading, refetch: refetchCoin } = useQuery<
    ServerResponseType<CoinDataType>
  >(
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

  useEffect(() => {
    refetch()
    refetchCoin()
  }, [])

  return !isCoinDataLoading && !isPriceResponseLoading ? (
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
        <Typography color="#3861FB">{t('more')}</Typography>
      </Stack>
      <Box overflow="hidden">
        <BarLineChart height={250} data={priceData} isLineGraph />
      </Box>
    </Stack>
  ) : (
    <TableSkeleton col_number={4} row_number={5} />
  )
}

export { CoinGraph }
