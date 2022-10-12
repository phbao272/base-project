import { Grid } from '@mui/material'
import React from 'react'
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
  price_change_percentage_24h: string
  market_cap: string
  circulating_supply: string
}

const endpoint = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'

export const Home = () => {
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
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 200,
      },
      {
        Header: 'Price',
        accessor: 'current_price',
        width: 200,
        Cell: ({ value }) => {
          return `$${numberWithCommas(value)}`
        },
      },
      {
        Header: '24h %',
        accessor: 'price_change_percentage_24h',
        Cell: ({ value }) => {
          return <TextChangePercent num={value} />
        },
      },
      {
        Header: 'Market capatialization',
        accessor: 'market_cap',
        Cell: ({ value }) => {
          return `$${numberWithCommas(value)}`
        },
      },
      {
        Header: 'Circulating supply',
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
