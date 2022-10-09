import { Avatar, Grid, Stack, Typography } from '@mui/material'
import React from 'react'

import { backgroundColor, yellow } from '@/styles'

import { AlignGrid, whiteColorStyle } from '../Layout'
import { Search } from './Search'

export const Header = () => {
  return (
    <Grid
      item
      container
      sx={{
        backgroundColor: backgroundColor['primary'],
        borderBottom: '1px solid #797C87',
        height: '90px',
      }}
      spacing={2}
    >
      <AlignGrid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: yellow['primary'],
            textDecoration: 'none',
          }}
        >
          LOGO
        </Typography>
      </AlignGrid>
      <AlignGrid item container xs={10}>
        <Grid item xs={4}>
          <Stack direction="row" justifyContent="space-around">
            <Typography sx={{ ...whiteColorStyle }} component="span">
              Tracking List
            </Typography>
            <Typography sx={{ ...whiteColorStyle }} component="span">
              Menu
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Search />
        </Grid>
        <Grid item xs={4}>
          <Stack direction="row" justifyContent="space-around" alignItems="center">
            <Typography sx={{ ...whiteColorStyle }} component="span">
              Sign In
            </Typography>
            <Typography sx={{ ...whiteColorStyle }} component="span">
              Sign Up
            </Typography>
            <Avatar
              sx={{ width: '32px', height: '32px' }}
              alt="Remy Sharp"
              src={'/assets/images/avatar3.webp'}
            />
          </Stack>
        </Grid>
      </AlignGrid>
    </Grid>
  )
}
