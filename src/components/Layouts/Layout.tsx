import { Grid, Hidden } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { backgroundColor, GridWithBackground } from '@/styles'

import { Header } from './Header'
import { SubHeader } from './Header/SubHeader'
import { Sidebar } from './Sidebar'
export const Layout = () => {
  return (
    <Grid
      sx={{ backgroundColor: backgroundColor['main'] }}
      container
      rowSpacing={3}
      columnSpacing={6}
    >
      {/* Header */}
      <Grid item xs={12}>
        <Header />
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
      {/* <Hidden smUp>
        <CustomDrawer />
      </Hidden> */}

      {/* Main */}
      <Grid item xs={12} sm={10} pr={{ xs: 1, sm: 6 }}>
        <Outlet />
      </Grid>

      {/* Footer */}
      <Grid item xs={12}>
        <div>Footer</div>
      </Grid>
    </Grid>
  )
}
