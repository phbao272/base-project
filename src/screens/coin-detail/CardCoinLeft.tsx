import { Box } from '@mui/material'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ArrowDropUpIcon, Card, Chip, StarOutline } from '@/components'
import { ICoin } from '@/libs/types'
import { filterEmptySrting, numberWithCommas } from '@/libs/utils'
import { BoxFlexAlignCenter, BoxFlexCenter, BoxHeader, green } from '@/styles'

import { TextPrice, Title } from './Coin'

interface ICardCoinLeft {
  coin: ICoin | null
}

export const CardCoinLeft: React.FC<ICardCoinLeft> = ({ coin }) => {
  const { t } = useTranslation()

  const TitleCard = useMemo(
    () => (
      <>
        <BoxFlexAlignCenter>
          <img src={coin?.image?.thumb} alt="" />
          <BoxHeader sx={{ ml: '16px', mr: '36px' }}>{coin?.name}</BoxHeader>
          <Chip
            content={coin?.symbol as string}
            sx={{ marginRight: '24px', textTransform: 'uppercase' }}
          />
          <Chip content={<StarOutline />} isOutline={true} />
        </BoxFlexAlignCenter>
        <BoxFlexAlignCenter gap="16px" sx={{ mt: '16px' }}>
          <Chip content={`${t('rank')} ${coin?.market_cap_rank}`} />
          <Chip content={'Đồng coin'} />
          <Chip content={'On 3,516,026 watchlists'} />
        </BoxFlexAlignCenter>
      </>
    ),
    [coin],
  )

  return (
    <div>
      <Card title={TitleCard} hasMore={false}>
        <Box>
          <Title>
            {t('price')} {coin?.name} (USD)
          </Title>
          <BoxFlexAlignCenter>
            <TextPrice>${numberWithCommas(coin?.market_data?.current_price?.usd || 0)}</TextPrice>
            <Chip
              content={
                <BoxFlexCenter>
                  0.2% fix cung
                  <ArrowDropUpIcon height="20px" width="20px" />
                </BoxFlexCenter>
              }
              sx={{
                backgroundColor: green['primary'],
                marginLeft: '24px',
                fontSize: '14px',
                fontWeight: 600,
              }}
            />
          </BoxFlexAlignCenter>
          <Title>0.06714 BTC fix cung</Title>
        </Box>
        {coin?.categories && (
          <Box mt={1}>
            <Title>{t('tag')}</Title>
            <Box>
              {filterEmptySrting(coin?.categories).map((item, index) => (
                <Chip content={item} key={index} sx={{ marginRight: '8px', marginTop: '8px' }} />
              ))}
            </Box>
          </Box>
        )}
      </Card>
    </div>
  )
}
