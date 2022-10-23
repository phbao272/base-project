import { CssBaseline, ThemeProvider } from '@mui/material'
import React, { Suspense } from 'react'
import { QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toast'

import { queryClient } from '@/libs/react-query'
import { Router } from '@/routers'
import { defaulTheme } from '@/styles'

const App = () => {
  return (
    <>
      <ThemeProvider theme={defaulTheme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <Suspense fallback="Loading...">
            <ToastContainer />
            <Router />
          </Suspense>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default App
