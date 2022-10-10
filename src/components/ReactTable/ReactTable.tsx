/* eslint-disable react/jsx-key */
import React, { ReactElement } from 'react'
import { TableOptions, usePagination, useSortBy, useTable } from 'react-table'
import styled from 'styled-components'

import { ArrowDropDownIcon, ArrowDropUpIcon, FilterOutline } from '@/components'
import { grey } from '@/styles'

// Pass params
// pageCount={10}
// manualPagination={true}
// to react table to enable pagination controlled

interface TableProperties<T extends object> extends TableOptions<T> {
  loading?: boolean
  handleChangeParams?: any
  pageCount?: number
  isSuccess?: boolean
  handleChangePagination?: any
}

const Styles = styled.div`
  display: block;
  max-width: 100%;

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid #eff2f5;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;

    tr {
      color: #fff;

      :last-child {
        td {
          border-bottom: 0;
        }
      }
      &:hover {
        // background-color: rgb(248, 250, 253);
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;

      border-bottom: 1px solid rgba(196, 196, 196, 0.56);

      font-weight: 700;

      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`
function ReactTable<T extends object>(props: TableProperties<T>): ReactElement {
  const {
    columns,
    data,
    loading,
    handleChangeParams,
    pageCount: controlledPageCount,
    handleChangePagination,
    ...useTableOptions
  } = props

  const instance = useTable<T>(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },

      // Pagination controller
      // pageCount: controlledPageCount,
      // manualPagination: true,

      ...useTableOptions,
    },
    useSortBy,
    usePagination,
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

    // usePagination
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = instance

  // console.log({ useTableOptions })

  console.log({ pageIndex, pageSize, rows, page, pageOptions, gotoPage, nextPage })

  React.useEffect(() => {
    console.log({ pageIndex, pageSize })
    // handleChangeParams({ _page: pageIndex, _limit: pageSize })
  }, [pageIndex, pageSize])

  // useEffect(() => {
  //   if (typeof handleChangePagination === 'function') {
  //     handleChangePagination({ _page: pageIndex + 1, _limit: pageSize })
  //   }
  // }, [handleChangePagination, pageIndex, pageSize])

  return (
    <Styles>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4 }}>
        <span style={{ fontWeight: 500, fontSize: '14px', color: '#fff' }}>Hiển thị hàng </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
          style={{
            padding: 4,
            height: 29,
            backgroundColor: grey['primary'],
            cursor: 'pointer',
            borderRadius: 8,
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 4,
            backgroundColor: grey['primary'],
            fontSize: 14,
            fontWeight: 'bold',
            height: 27,
            gap: 4,
            cursor: 'pointer',
            borderRadius: 8,
          }}
        >
          <FilterOutline />
          Bộ lọc
        </span>
      </div>

      <div className="tableWrap">
        <table {...getTableProps()} style={{ borderSpacing: 0 }}>
          <thead>
            {headerGroups.map((headerGroup) => {
              return (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    return (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        style={{
                          whiteSpace: 'nowrap',
                          fontWeight: 'bold',
                          minWidth: column.minWidth,
                          width: column.width,
                          textAlign: 'left',
                          cursor: 'pointer',
                          ...column.style,
                        }}
                      >
                        {column.render('Header')}
                        <span style={{ position: 'relative', top: '2px' }}>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <ArrowDropDownIcon />
                            ) : (
                              <ArrowDropUpIcon />
                            )
                          ) : (
                            ''
                          )}
                        </span>
                      </th>
                    )
                  })}
                </tr>
              )
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {/* {rows.map((row) => { */}
            {page.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          minWidth: cell.column.minWidth,
                          width: cell.column.width,
                          ...cell.column.style,
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination" style={{ textAlign: 'right' }}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span style={{ color: '#fff' }}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </div>
    </Styles>
  )
}

export { ReactTable }
