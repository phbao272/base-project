import React from 'react'
import { useQuery } from 'react-query'
import { Column } from 'react-table'

import { ReactTableWithToolBar } from '@/components/ReactTable'

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
  // const [params, setParams] = React.useState({ _page: 0, _limit: 5 })
  const [params, setParams] = React.useState({})

  // const { paginationData, handleChangeParams, refetch } = usePaginationQuery<any>(endpoint, params)

  const { isLoading, error, data, refetch, isSuccess } = useQuery<ColType[]>(
    [endpoint, { ...params }],
    {
      keepPreviousData: true,
    },
  )

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
      },
      {
        Header: '24h %',
        accessor: 'price_change_percentage_24h',
      },
      {
        Header: 'Market capatialization',
        accessor: 'market_cap',
      },
      {
        Header: 'Circulating supply',
        accessor: 'circulating_supply',
      },
    ],
    [],
  )

  return (
    <div>
      <ReactTableWithToolBar
        title="Top các loại tiền điện tử theo khối lượng"
        columns={columns}
        data={data || []}
        // handleChangeParams={handleChangeParams}
        // {...paginationData}
        // pageCount={10}
        // manualPagination={true}
      />
    </div>
  )
}
