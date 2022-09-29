import { Box, Grid, styled, Typography } from '@mui/material'

import { backgroundColor } from './colors'

export const BoxHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  lineHeight: '29px',
  color: '#fff',
  marginBottom: '24px',
}))
export const BoxImage = styled(Box)({
  width: 28,
  height: 28,
})
export const imageStyle = {
  width: 20,
  height: 20,
}
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

export const responsiveTextStyle = {
  fontSize: { xs: 12, sm: 14 },
}

// export const BoxGreyBorder = styled(Box)({
//   border: ''
// })