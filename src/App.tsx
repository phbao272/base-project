import { CssBaseline, ThemeProvider } from '@mui/material'
import { useAtom } from 'jotai'
import React, { Suspense, useEffect } from 'react'
import { QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toast'

import { queryClient } from '@/libs/react-query'
import { Router } from '@/routers'
import { defaulTheme } from '@/styles'

import { getMe } from './libs/apis'
import { userAtomWithStorage } from './libs/atoms/authAtom'

const App = () => {
  const [userStorage, setUserStorage] = useAtom(userAtomWithStorage)

  useEffect(() => {
    getMe().then((res) => setUserStorage(res.data.data))
  }, [])
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
