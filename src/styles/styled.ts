import { Box, styled, Typography } from '@mui/material'

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
