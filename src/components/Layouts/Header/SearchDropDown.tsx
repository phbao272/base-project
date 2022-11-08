import { Box, MenuItem, Paper, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { ICoinLaravel } from '@/libs/types'
import { backgroundColor, WhiteTypograpy } from '@/styles'

type SearchDropDownProps = {
  open: boolean
  handleClose: () => void
  searchResult?: ICoinLaravel[] | null
}
export const SearchDropDown = (props: SearchDropDownProps) => {
  const { open, handleClose, searchResult } = props

  const navigate = useNavigate()

  return (
    <>
      {open ? (
        <Paper
          sx={{ position: 'absolute', backgroundColor: backgroundColor['main'], width: '100%' }}
        >
          <Box>
            <Stack sx={{ maxHeight: 400, overflowY: 'auto' }}>
              {searchResult?.map((item: any, index: any) => (
                <Box
                  key={index}
                  sx={{
                    py: 1,
                    '&:hover': {
                      backgroundColor: backgroundColor['primary'],
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose()
                      navigate(`/currencies/${item.id}`)
                    }}
                  >
                    <WhiteTypograpy>{item.name}</WhiteTypograpy>
                  </MenuItem>
                </Box>
              ))}
            </Stack>
          </Box>
        </Paper>
      ) : undefined}
    </>
  )
}
