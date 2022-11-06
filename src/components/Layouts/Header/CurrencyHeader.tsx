import { Box, Button, Popover, styled, Typography } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'

import FlagBTC from '@/assets/svgs/currencies/btc.png'
import FlagETH from '@/assets/svgs/currencies/eth.png'
import FlagUSD from '@/assets/svgs/currencies/USD.svg'
import FlagVND from '@/assets/svgs/currencies/VND.svg'
import { currencyAtomWithStorage } from '@/libs/atoms'
interface ICurrency {
  name: string
  symbol: string
  flag: string
}

const CURRENCIES: ICurrency[] = [
  {
    name: 'Vietnamese Dong',
    symbol: 'vnd',
    flag: FlagVND,
  },
  {
    name: 'United States Dollar',
    symbol: 'usd',
    flag: FlagUSD,
  },
  {
    name: 'Bitcoin',
    symbol: 'btc',
    flag: FlagBTC,
  },
  {
    name: 'Ethereum',
    symbol: 'eth',
    flag: FlagETH,
  },
]

export const CurrencyHeader = () => {
  const [displayMenu, setDisplayMenu] = useState<string>('none')
  const [flag, setFlag] = useState<string>('')
  const [currency, setCurrency] = useState<string>('')
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [currencyAtom, setCurrencyAtom] = useAtom(currencyAtomWithStorage)

  const handleOpenMenu = (e: any) => {
    displayMenu === 'none' ? setDisplayMenu('') : setDisplayMenu('none')
    handleClick(e)
  }

  const handleSetCurrency = (c: ICurrency) => {
    setCurrencyAtom(c.symbol)
    setFlag(c.flag)
    setCurrency(c.symbol)
    location.reload()
  }

  const _setCurrency = () => {
    if (currencyAtom) {
      const c = CURRENCIES.find((i) => i.symbol === currencyAtom)
      if (c) {
        setCurrency(c.symbol)
        setFlag(c.flag)
      } else {
        setCurrency('usd')
        setFlag(FlagUSD)
      }
    } else {
      setCurrency('usd')
      setFlag(FlagUSD)
    }
  }
  useEffect(() => {
    _setCurrency()
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <React.Fragment>
      <Box>
        <LanguageButton onClick={handleOpenMenu} type="button">
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <img src={flag} alt="flag" style={{ width: '28px', height: '28px' }} />
          </ListItemIcon>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#fff',
            }}
          >
            {currency}
          </Typography>
        </LanguageButton>

        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <MenuList>
            {CURRENCIES.map((c, index) => (
              <MenuFlagItem
                key={index}
                onClick={() => {
                  handleSetCurrency(c)
                }}
              >
                <ListItemIcon>
                  <img src={c.flag} alt="flag" style={{ width: '36px', height: '36px' }} />
                </ListItemIcon>
                <LanguageButton type="button">{c.name}</LanguageButton>
              </MenuFlagItem>
            ))}
          </MenuList>
        </Popover>
      </Box>
    </React.Fragment>
  )
}
const LanguageButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    background: 'rgba(89, 195, 255, 0.1)',
  },
  fontSize: theme.spacing(1.75),
  fontWeight: 600,
  lineHeight: theme.spacing(3.5),
  textTransform: 'uppercase',
  color: theme.palette.grey[600],
  // margin: 30,
  padding: `0px ${theme.spacing(1)}`,
  '& span': {
    paddingBottom: '4px',
  },
}))
const MenuFlagItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    background: 'rgba(89, 195, 255, 0.1)',
  },
}))
