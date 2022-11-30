import { Grid, Hidden, Stack } from '@mui/material'
import axios from 'axios'
import { useUpdateAtom } from 'jotai/utils'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/Layouts'
import {
  CurrencyHeader,
  CustomDrawer,
  Header,
  LanguageHeader,
  Sidebar,
  SubHeader,
} from '@/components/Layouts'
import { changeCurrencyAtom } from '@/libs/atoms'
import { backgroundColor, GridWithBackground } from '@/styles'

export const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const triggerSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  const setChangeCurrency = useUpdateAtom(changeCurrencyAtom)

  useQuery('changeCurrency', async () => {
    const res = await axios.get(
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json',
    )

    setChangeCurrency({
      usd: 1,
      btc: res.data.usd.btc,
      eth: res.data.usd.eth,
      vnd: res.data.usd.vnd,
    })
  })

  return (
    <Grid
      sx={{ backgroundColor: backgroundColor['main'] }}
      container
      rowSpacing={3}
      columnSpacing={6}
    >
      {/* Header */}
      <Grid item xs={12}>
        <Header triggerSidebar={triggerSidebar} />
      </Grid>
      <Hidden smUp>
        <Grid item xs={12}>
          <SubHeader />
        </Grid>
      </Hidden>

      {/* Sidebar / Drawer */}
      <Hidden smDown>
        <GridWithBackground item xs={0} sm={2}>
          <Sidebar />
        </GridWithBackground>
      </Hidden>

      <Hidden smUp>
        <CustomDrawer open={isSidebarOpen} setOpen={triggerSidebar}>
          <Sidebar />
          <Hidden mdUp>
            <Stack sx={{ position: 'absolute', bottom: '10px', left: 10 }} gap="8px">
              <LanguageHeader />
              <CurrencyHeader />
            </Stack>
          </Hidden>
        </CustomDrawer>
      </Hidden>

      {/* Main */}
      <Grid sx={{ minHeight: 'calc(100vh - 74px)' }} item xs={12} sm={10} pr={{ xs: 1, sm: 6 }}>
        <Outlet />
        <Footer />
      </Grid>
    </Grid>
  )
}
