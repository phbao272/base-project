import { styled, Typography } from '@mui/material'

import { grey } from '@/styles'

export const Text = styled(Typography)({
  fontSize: '13px',
  fontWeight: 600,
  position: 'relative',
  top: '-2px',
  color: grey['secondary'],
})
