import { CssBaseline } from '@mui/material'
import { useAtom } from 'jotai'
import React, { Suspense, useEffect } from 'react'
import { QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toast'

import { queryClient } from '@/libs/react-query'
import { Router } from '@/routers'

import { getMe } from './libs/apis'
import { userAtom } from './libs/atoms/authAtom'

const App = () => {
  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
    getMe().then((res) => setUser(res.data.data))
  }, [])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Suspense fallback="Loading...">
          <ToastContainer />
          <Router />
        </Suspense>
      </QueryClientProvider>
    </>
  )
}

export default App
