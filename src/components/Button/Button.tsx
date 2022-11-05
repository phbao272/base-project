import { Button as ButtonMUI, ButtonProps } from '@mui/material'
import React from 'react'

type TButton = {} & ButtonProps

export const Button: React.FC<TButton> = ({ children, ...ButtonProps }) => {
  return (
    <ButtonMUI {...ButtonProps} sx={{ ...ButtonProps['sx'] }}>
      {children}
    </ButtonMUI>
  )
}
