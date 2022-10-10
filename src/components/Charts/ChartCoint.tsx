import { Box } from '@mui/material'
import React, { useState } from 'react'

import { TabPanel, TabsStyled, TabStyled } from '../Tabs'
import { BarLineChart } from './component/BarLineChart'

enum Tab {
  Price,
  MarketCap,
  CandleChart,
}

export const DataX = new Array(498).fill('10:15 AM')

export const DataY = {
  two: new Array(498).fill(400),
  four: new Array(498).fill(0).map(() => Math.floor(Math.random() * (69 - 40 + 1)) + 40),
}

const ChartCoint = () => {
  const data = {
    year: '2022',
    dataX: DataX,
    dataY: DataY,
  }
  const [tab, setTab] = useState<Tab>(Tab.Price)

  return (
    <Box>
      <Box width={380}>
        <TabsStyled value={tab} numberOfTab={3} onChange={(e, value) => setTab(value)}>
          <TabStyled label="Price" />
          <TabStyled label="Market Cap" />
          <TabStyled label="Candle Chart" />
        </TabsStyled>
      </Box>

      <TabPanel value={tab} index={Tab.Price}>
        <BarLineChart height={500} data={data} isPriceOption />
      </TabPanel>
      <TabPanel value={tab} index={Tab.MarketCap}>
        <BarLineChart height={500} data={data} isMarketOption />
      </TabPanel>
      <TabPanel value={tab} index={Tab.CandleChart}>
        Candle Chart
      </TabPanel>
    </Box>
  )
}

export { ChartCoint }
