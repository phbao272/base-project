import { Grid } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Column } from 'react-table'

import { TextChangePercent } from '@/components'
import { ReactTableWithToolBar } from '@/components/ReactTable'
import { numberWithCommas } from '@/libs/utils'
import { TrendingList } from '@/screens/home'
import { strokeColor } from '@/styles'
// import viberateLogo from '@/viberate_logo.png'

type ColType = {
  id: string
  market_cap_rank: number
  name: string
  current_price: string
  price_change_percentage_1h_in_currency: string
  price_change_percentage_24h_in_currency: string
  price_change_percentage_7d_in_currency: string
  market_cap: string
  circulating_supply: string
}

const endpoint =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d'

export const Home = () => {
  const { t } = useTranslation()
  const [params, setParams] = React.useState({})

  // const { paginationData, handleChangeParams, refetch } = usePaginationQuery<any>(endpoint, params)

  const { isLoading, error, data, refetch, isSuccess } = useQuery<ColType[]>(
    [endpoint, { ...params }],
    {
      keepPreviousData: true,
    },
  )

  const recentlyAddList = [
    {
      index: 1,
      name: 'Viberate',
      code: 'VIB',
      variable: 0.02,
    },
    {
      index: 2,
      name: 'Viberate',
      code: 'VIB',
      variable: 0.02,
    },
    {
      index: 3,
      name: 'Viberate',
      code: 'VIB',
      variable: 0.02,
    },
  ]

  console.log({ data })

  const columns = React.useMemo<Column<ColType>[]>(
    () => [
      {
        Header: '#',
        accessor: 'market_cap_rank', // accessor is the "key" in the data
        width: 10,
        sticky: 'left',
      },
      {
        Header: t('name'),
        accessor: 'name',
        width: 200,
        sticky: 'left',
      },
      {
        Header: t('price'),
        accessor: 'current_price',
        width: 200,
        Cell: ({ value }) => {
          return `$${numberWithCommas(value)}`
        },
      },
      {
        Header: '1h %',
        accessor: 'price_change_percentage_1h_in_currency',
        Cell: ({ value }) => {
          return <TextChangePercent num={value} />
        },
      },
      {
        Header: '24h %',
        accessor: 'price_change_percentage_24h_in_currency',
        Cell: ({ value }) => {
          return <TextChangePercent num={value} />
        },
      },
      {
        Header: '7d %',
        accessor: 'price_change_percentage_7d_in_currency',
        Cell: ({ value }) => {
          return <TextChangePercent num={value} />
        },
      },
      {
        Header: t('market_cap'),
        accessor: 'market_cap',
        Cell: ({ value }) => {
          return `$${numberWithCommas(value)}`
        },
      },
      {
        Header: t('circulating_supply'),
        accessor: 'circulating_supply',
        Cell: ({ value }) => {
          return `$${numberWithCommas(value)}`
        },
      },
    ],
    [],
  )

  const grid = {
    xs: 12,
    md: 6,
  }

  const gridFull = {
    xs: 12,
    md: 12,
  }
  return (
    <Grid container spacing={3} pl={{ xs: 1, sm: 'unset' }}>
      <Grid item {...gridFull}>
        <ReactTableWithToolBar
          sxCustom={{ border: `1px solid ${strokeColor['primary']}` }}
          title="Top các loại tiền điện tử theo khối lượng"
          columns={columns}
          data={data || []}
          isLoading={isLoading}
          // isLoading={true}
          // handleChangeParams={handleChangeParams}
          // {...paginationData}
          // pageCount={10}
          // manualPagination={true}
        />
      </Grid>
      <Grid item {...grid}>
        <TrendingList />
      </Grid>

      <Grid item {...grid}>
        <TrendingList />
      </Grid>

      {/* <Grid item {...grid}>
        <Card title="Trending">
          <Stack spacing={2}>
            {recentlyAddList.map((item, index) => (
              <Stack key={index} direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={3}>
                  <WhiteTypograpy>{item.index}</WhiteTypograpy>
                  <Box sx={{ ...imageStyle }} component="img" src={viberateLogo} />
                  <WhiteTypograpy>{item.name}</WhiteTypograpy>
                  <WhiteTypograpy sx={{ opacity: 0.5 }}>{item.code}</WhiteTypograpy>
                </Stack>
                <Typography color={green['primary']}>{item.variable}</Typography>
              </Stack>
            ))}
          </Stack>
        </Card>
      </Grid> */}
    </Grid>
  )
}
