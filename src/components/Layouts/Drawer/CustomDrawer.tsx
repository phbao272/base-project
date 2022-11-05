import { Box, Drawer } from '@mui/material'
import React from 'react'

import { backgroundColor } from '@/styles'
interface PropsType {
  open: boolean
  setOpen: () => void
}

export const CustomDrawer: React.FC<PropsType> = ({ children, open, setOpen }) => {
  return (
    <React.Fragment>
      <Drawer anchor="left" open={open} onClose={setOpen}>
        <Box
          role="presentation"
          sx={{ backgroundColor: backgroundColor['primary'], height: '100vh' }}
        >
          {children}
        </Box>
      </Drawer>
    </React.Fragment>
  )
}
