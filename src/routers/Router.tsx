import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Layout } from '@/components/Layouts'
import { Home, NotFound } from '@/screens'
import { Login } from '@/screens/auth'

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
