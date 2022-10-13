import { Grid, Hidden, Stack } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { CustomDrawer, Header, LanguageHeader, Sidebar, SubHeader } from '@/components/Layouts'
import { backgroundColor, GridWithBackground } from '@/styles'
export const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const triggerSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

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
            <Stack sx={{ position: 'absolute', bottom: '10px', left: 10 }}>
              <LanguageHeader />
            </Stack>
          </Hidden>
        </CustomDrawer>
      </Hidden>

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
