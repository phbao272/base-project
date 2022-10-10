import { Avatar, Grid, Hidden, Stack, Typography } from '@mui/material'
import React from 'react'

import {
  AlignGrid,
  backgroundColor,
  responsiveTextStyle,
  strokeColor,
  whiteColorStyle,
  yellow,
} from '@/styles'

import { Search } from './Search'

export const Header = () => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: backgroundColor['primary'],
        borderBottom: `1px solid ${strokeColor['primary']}`,
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
        <Hidden smDown>
          <Grid item xs={4}>
            <Stack direction="row" justifyContent="space-around">
              <Typography sx={{ ...whiteColorStyle, ...responsiveTextStyle }} component="span">
                Tracking List
              </Typography>
              <Typography sx={{ ...whiteColorStyle, ...responsiveTextStyle }} component="span">
                Menu
              </Typography>
            </Stack>
          </Grid>
        </Hidden>
        <Grid item xs={4}>
          <Search />
        </Grid>
        <Grid item xs={4}>
          <Stack direction="row" justifyContent="space-around" alignItems="center">
            <Hidden smDown>
              <Typography sx={{ ...whiteColorStyle, ...responsiveTextStyle }} component="span">
                Sign In
              </Typography>
              <Typography sx={{ ...whiteColorStyle, ...responsiveTextStyle }} component="span">
                Sign Up
              </Typography>
            </Hidden>
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
