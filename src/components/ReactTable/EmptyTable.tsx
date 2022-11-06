import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

import NoDataSvg from '@/assets/svgs/no_data.svg'

const EmptyTable: React.VFC = () => {
  const { t } = useTranslation()
  return (
    <Stack justifyContent="center" alignItems="center" spacing={0.5} height="500px">
      <Box component="img" src={NoDataSvg} />
      <Typography variant="body2" color="grey.400">
        {t('no_data')}
      </Typography>
    </Stack>
  )
}

export { EmptyTable }
