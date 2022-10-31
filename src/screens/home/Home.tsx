import { Grid } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Column } from 'react-table'

import { TextChangePercent } from '@/components'
import { ReactTableWithToolBar } from '@/components/ReactTable'
import { numberWithCommas } from '@/libs/utils'
import { TrendingList } from '@/screens/home'
import { CustomLink, strokeColor } from '@/styles'

import { CoinGraph } from './coinGraph/CoinGraph'
// import viberateLogo from '@/viberate_logo.png'

// const recentlyAddList = [
//   {
//     index: 1,
//     name: 'Viberate',
//     code: 'VIB',
//     variable: 0.02,
//   },
//   {
//     index: 2,
//     name: 'Viberate',
//     code: 'VIB',
//     variable: 0.02,
//   },
//   {
//     index: 3,
//     name: 'Viberate',
//     code: 'VIB',
//     variable: 0.02,
//   },
// ]

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

export const DataX = new Array(498).fill('10:15 AM')

export const DataY = {
  price: new Array(498).fill(4000),
  volume: [],
}
const dataChart = { dataX: DataX, dataY: DataY }

export const Home = () => {
  const { t } = useTranslation()
  const [params, setParams] = React.useState({})

  // const { paginationData, handleChangeParams, refetch } = usePaginationQuery<any>(endpoint, params)

  const [listCoinGraph, setListCoinGraph] = React.useState<any[]>([])

  const { isLoading, error, data, refetch, isSuccess } = useQuery<ColType[]>(
    [endpoint, { ...params }],
    {
      keepPreviousData: true,
      onSuccess(data) {
        // const res = request.post('coin/store-array', data)
        setListCoinGraph(data.slice(0, 4))
      },
    },
  )

  // useQuery<ServerResponseType<any>>(
  //   [
  //     `${baseUrl}/coins?referenceCurrencyUuid=${defaultReferenceCurrency}&timePeriod=24h&tiers[0]=1&orderBy=marketCap&orderDirection=desc&limit=100&offset=1700`,
  //     {},
  //     {
  //       headers: cryptoApiHeaders,
  //     },
  //   ],
  //   {
  //     onSuccess: (data) => {
  //       console.log('data', data.data.coins)
  //       const res = request.post('coin/crawl-uuid', data.data.coins)
  //     },
  //   },
  // )

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
        Cell: ({ row }) => {
          return (
            <CustomLink to={`/currencies/${row.original.id || ''}`}>{row.original.name}</CustomLink>
          )
        },
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
        <CoinGraph idCoin="Qwsogvtv82FCd" />
      </Grid> */}

      {listCoinGraph.map((coin, index) => (
        <Grid item {...grid} key={index}>
          <CoinGraph idCoin={coin.id} coin={coin} />
        </Grid>
      ))}

      {/* <Grid item {...grid}>
        <CoinGraph idCoin="VINVMYf0u" />
      </Grid>
      <Grid item {...grid}>
        <CoinGraph idCoin="razxDUgYGNAdQ" />
      </Grid>
      <Grid item {...grid}>
        <CoinGraph idCoin="Qwsogvtv82FCd" />
      </Grid> */}
    </Grid>
  )
}
