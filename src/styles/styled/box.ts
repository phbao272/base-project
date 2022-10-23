import { Box, Grid, styled, Typography } from '@mui/material'

export const BoxHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  lineHeight: '29px',
  color: '#fff',
  // marginBottom: '24px',
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

export const BoxFlexAlignCenter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
})

export const BoxFlexCenter = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const BoxFlexStart = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'start',
})
