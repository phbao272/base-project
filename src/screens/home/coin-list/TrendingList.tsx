import { Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toast'

import { Card } from '@/components'
import { green, imageStyle, WhiteTypograpy } from '@/styles'

interface CoinListProps {
  item: { coin_id: number; name: string; symbol: string; thumb: string; price_btc: string | number }
}

interface CoinListResponse {
  coins: CoinListProps[]
}

export const TrendingList = () => {
  const [trendingList, setTrendingList] = useState<CoinListProps[]>([])

  useQuery<CoinListResponse>([`https://api.coingecko.com/api/v3/search/trending`], {
    onSuccess: (data) => {
      console.log({ data })
      setTrendingList(data.coins.slice(0, 3))
    },
    onError: (error: any) => {
      toast.error(error.message)
    },
  })

  return (
    <Card title="Trending">
      <Stack spacing={2}>
        {trendingList.map((item: CoinListProps, index) => (
          <Stack key={item.item.coin_id} direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <WhiteTypograpy sx={{ opacity: 0.5 }}>{index + 1}</WhiteTypograpy>
              <Box sx={{ ...imageStyle }} component="img" src={item.item.thumb} />
              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row',
                }}
                spacing={{
                  sm: 1,
                  xs: 0,
                }}
                alignItems={{
                  xs: 'flex-start',
                  sm: 'center',
                }}
              >
                <WhiteTypograpy>{item.item.name}</WhiteTypograpy>
                <WhiteTypograpy
                  sx={{
                    opacity: 0.5,
                    fontSize: {
                      xs: '0.75rem',
                      sm: '0.775rem',
                    },
                    fontWeight: 'bold',
                  }}
                >
                  {item.item.symbol}
                </WhiteTypograpy>
              </Stack>
            </Stack>
            <Typography color={green['primary']}>
              {Number(item.item.price_btc).toFixed(2)} (bitcoin)
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  )
}
