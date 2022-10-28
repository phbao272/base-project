import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { ChartCoin } from '@/components/Charts/ChartCoin'
import { Layout } from '@/components/Layouts'
import { Coin, Home, Login, NotFound } from '@/screens'

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route path="/chart" element={<ChartCoin />} />
        <Route path="/currencies/:coin_id" element={<Coin />} />
        <Route path="/chart" element={<ChartCoin />} />
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
