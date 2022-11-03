import { Grid } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Column } from 'react-table'

import { TextChangePercent } from '@/components'
import { ReactTableWithToolBar } from '@/components/ReactTable'
import { numberWithCommas } from '@/libs/utils'
import { CustomLink, strokeColor } from '@/styles'

import { ColType } from '../home'

export const WatchList = () => {
  const [params, setParams] = React.useState({})
  const { t } = useTranslation()
  const gridFull = {
    xs: 12,
    md: 12,
  }
  const endpoint =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d'
  const { isLoading, error, data, refetch, isSuccess } = useQuery<ColType[]>(
    [endpoint, { ...params }],
    {
      keepPreviousData: true,
      onSuccess(data) {
        // const res = request.post('coin/store-array', data)
        console.log('data', data)
      },
      retry: 3,
    },
  )
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
  return (
    <Grid container>
      <Grid item {...gridFull}>
        <ReactTableWithToolBar
          sxCustom={{ border: `1px solid ${strokeColor['primary']}` }}
          title={t('watch_list.title')}
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
    </Grid>
  )
}
