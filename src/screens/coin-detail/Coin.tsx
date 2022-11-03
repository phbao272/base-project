import { Box, Grid, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { BoxDescription } from '@/components'
import { ChartCoin } from '@/components/Charts'
import { ChartSkeleton } from '@/components/Skeleton/ChartSkeleton'
import { ICoin, ICoinLaravel, IDescription } from '@/libs/types'

import { CardCoinLeft } from './CardCoinLeft'
import { CardCoinRight } from './CardCoinRight'
import { CoinPost } from './CoinPost'

export const Coin = () => {
  const { t } = useTranslation()
  const { coin_id } = useParams()

  const [coin, setCoin] = useState<ICoin | null>(null)
  const [uuidCoin, setUuidCoin] = useState<string>('')

  const language = localStorage.getItem('language') || 'en'

  const { isFetching } = useQuery<ICoinLaravel>([`coin/${coin_id}`], {
    onSuccess(data) {
      setUuidCoin(data.uuid)
    },
  })

  useQuery<ICoin>([`https://api.coingecko.com/api/v3/coins/${coin_id}`], {
    onSuccess: (data) => {
      setCoin(data)
      console.log(data)
    },
  })

  const grid = {
    xs: 12,
    md: 6,
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item {...grid}>
          <CardCoinLeft coin={coin} />
        </Grid>
        <Grid item {...grid}>
          <CardCoinRight coin={coin} />
        </Grid>
      </Grid>

      {uuidCoin ? (
        <Box sx={{ my: 4 }}>
          {!isFetching ? <ChartCoin idCoin={uuidCoin} /> : <ChartSkeleton />}
        </Box>
      ) : (
        <></>
      )}

      <BoxDescription
        desc={
          coin?.description[language as keyof IDescription] || (coin?.description?.en as string)
        }
      />
      {coin_id && <CoinPost coin_id={coin_id} />}
    </>
  )
}

export const TextPrice = styled(Typography)({
  fontWeight: 700,
  fontSize: '30px',
  lineHeight: '36px',
})

export const Title = styled(Typography)({
  fontSize: '12px',
  fontWeight: 400,
  color: 'rgba(255, 255, 255, 0.8)',
})
