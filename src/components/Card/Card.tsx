import { Box, Typography } from '@mui/material'
import React from 'react'

import { backgroundColor, blue, BoxFlexCenterSpaceBetween, BoxHeader, strokeColor } from '@/styles'

interface CardProps {
  title: string
  children: React.ReactNode
  hasMore?: boolean
}

export const Card = ({ title, children, hasMore = true }: CardProps) => {
  return (
    <Box
      sx={{
        padding: '20px',
        borderRadius: 1,
        backgroundColor: backgroundColor['primary'],
        border: `1px solid ${strokeColor['primary']}`,
        overflow: 'hidden',
      }}
    >
      <BoxFlexCenterSpaceBetween>
        <BoxHeader>{title}</BoxHeader>
        {hasMore && <Typography sx={{ color: blue['primary'] }}>More</Typography>}
      </BoxFlexCenterSpaceBetween>
      {children}
    </Box>
  )
}
