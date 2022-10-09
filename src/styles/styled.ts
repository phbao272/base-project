import { Box, Grid, styled, Typography } from '@mui/material'

import { backgroundColor } from './colors'

export const BoxHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  lineHeight: '29px',
  color: '#fff',
}))

export const BoxFlexCenterSpaceBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})
export const AlignGrid = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
})
export const GridWithBackground = styled(Grid)({
  backgroundColor: backgroundColor['primary'],
})

export const WhiteTypograpy = styled(Typography)({
  color: 'white',
})

export const whiteColorStyle = {
  color: 'white',
}


