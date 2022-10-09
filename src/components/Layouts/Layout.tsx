import { Grid, Hidden } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { backgroundColor, GridWithBackground } from '@/styles'

import { CustomDrawer } from './Drawer/CustomDrawer'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
export const Layout = () => {
  return (
    <Grid sx={{ backgroundColor: backgroundColor['main'] }} container spacing={2}>
      {/* Header */}
      <Header />

      {/* Sidebar / Drawer */}
      <Hidden smDown>
        <GridWithBackground item xs={0} sm={2}>
          <Sidebar />
        </GridWithBackground>
      </Hidden>
      <Hidden smUp>
        <CustomDrawer />
      </Hidden>

      {/* Main */}
      <Grid item xs={12} sm={10}>
        <Outlet />
      </Grid>

      {/* Footer */}
      <Grid item xs={12}>
        <div>Footer</div>
      </Grid>
    </Grid>
  )
}
