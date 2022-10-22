import { createTheme } from '@mui/material'

import { text } from '@/styles'

export const defaulTheme = createTheme({
  typography: {
    allVariants: {
      color: text['primary'],
    },
  },
})
