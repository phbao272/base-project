import { Grid, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { BoxDescription } from '@/components'
import { ICoin, IDescription } from '@/libs/types'

import { CardCoinLeft } from './CardCoinLeft'
import { CardCoinRight } from './CardCoinRight'

export const Coin = () => {
  const { t } = useTranslation()
  const { coin_id } = useParams()

  const [coin, setCoin] = useState<ICoin | null>(null)

  const language = localStorage.getItem('language') || 'en'

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
      <div>Đồ thị</div>
      <BoxDescription
        desc={
          coin?.description[language as keyof IDescription] || (coin?.description?.en as string)
        }
      />
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
