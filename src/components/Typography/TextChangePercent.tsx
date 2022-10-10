import { Typography } from '@mui/material'
import React from 'react'

import { green, red } from '@/styles'

export const TextChangePercent = ({ num }: { num: number | string }) => {
  const number = Number(num)
  const color = number > 0 ? green['primary'] : red['primary']

  return <Typography sx={{ fontWeight: '700', color: color }}>{number.toFixed(2)}%</Typography>
}
