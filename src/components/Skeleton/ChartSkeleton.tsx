import { Box, Skeleton, Stack } from '@mui/material'
import React from 'react'

import { optionTimeFilter } from '@/constants'

const ChartSkeleton: React.VFC = () => {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Skeleton height={80} width={380} variant="text" sx={{ bgcolor: 'grey.900' }} />
        <Stack direction="row">
          {optionTimeFilter.map((option) => (
            <Skeleton key={option} variant="text" width={75} sx={{ bgcolor: 'grey.900' }} />
          ))}
        </Stack>
      </Stack>
      <Stack alignItems="center" mt={-17}>
        <Skeleton variant="text" height={800} width="85%" sx={{ bgcolor: 'grey.900' }} />
      </Stack>
    </Box>
  )
}

export { ChartSkeleton }
