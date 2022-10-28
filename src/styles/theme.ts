import { createTheme } from '@mui/material'

import { blue, green, red, text } from '@/styles'
export const defaulTheme = createTheme({
  typography: {
    allVariants: {
      color: text['primary'],
    },
  },
  palette: {
    primary: {
      main: blue['primary'],
    },
    error: {
      main: red['primary'],
    },
    success: {
      main: green['primary'],
    },
  },
})
