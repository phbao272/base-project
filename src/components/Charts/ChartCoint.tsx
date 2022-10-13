import { Box } from '@mui/material'
import React, { useState } from 'react'

import { TabPanel, TabsStyled, TabStyled } from '../Tabs'
import { BarLineChart } from './component/BarLineChart'
import { CandleChart } from './component/CandleChart'

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

const dataCandle = [
  ['2004-01-02', 10452.74, 10409.85, 10367.41, 10554.96, 168890000],
  ['2004-01-05', 10411.85, 10544.07, 10411.85, 10575.92, 221290000],
  ['2004-01-06', 10543.85, 10538.66, 10454.37, 10584.07, 191460000],
  ['2004-01-07', 10535.46, 10529.03, 10432, 10587.55, 225490000],
  ['2004-01-02', 10452.74, 10409.85, 10367.41, 10554.96, 168890000],
  ['2004-01-05', 10411.85, 10544.07, 10411.85, 10575.92, 221290000],
  ['2004-01-06', 10543.85, 10538.66, 10454.37, 10584.07, 191460000],
  ['2004-01-07', 10535.46, 10529.03, 10432, 10587.55, 225490000],
  ['2004-01-02', 10452.74, 10409.85, 10367.41, 10554.96, 168890000],
  ['2004-01-05', 10411.85, 10544.07, 10411.85, 10575.92, 221290000],
  ['2004-01-06', 10543.85, 10538.66, 10454.37, 10584.07, 191460000],
  ['2004-01-07', 10535.46, 10529.03, 10432, 10587.55, 225490000],
  ['2004-01-02', 10452.74, 10409.85, 10367.41, 10554.96, 168890000],
  ['2004-01-05', 10411.85, 10544.07, 10411.85, 10575.92, 221290000],
  ['2004-01-06', 10543.85, 10538.66, 10454.37, 10584.07, 191460000],
  ['2004-01-07', 10535.46, 10529.03, 10432, 10587.55, 225490000],
  ['2004-01-02', 10452.74, 10409.85, 10367.41, 10554.96, 168890000],
  ['2004-01-05', 10411.85, 10544.07, 10411.85, 10575.92, 221290000],
  ['2004-01-06', 10543.85, 10538.66, 10454.37, 10584.07, 191460000],
  ['2004-01-07', 10535.46, 10529.03, 10432, 10587.55, 225490000],
]

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
        <BarLineChart height={600} data={data} isPriceOption />
      </TabPanel>
      <TabPanel value={tab} index={Tab.MarketCap}>
        <BarLineChart height={600} data={data} isMarketOption />
      </TabPanel>
      <TabPanel value={tab} index={Tab.CandleChart}>
        <CandleChart />
      </TabPanel>
    </Box>
  )
}

export { ChartCoint }
