/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Menu, MenuItem, styled } from '@mui/material'
import React from 'react'

import { backgroundColor } from '@/styles'

interface IDropDown {
  data?: string[] | [string, string][] | null
  button: React.ReactNode | string
  customMenuItems?: React.ReactNode[] | null
}

export const DropDown: React.FC<IDropDown> = ({ data, button, customMenuItems }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <span onClick={handleOpen}>{button}</span>
      <MenuStyled
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          marginTop: '16px',
          maxHeight: '300px',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 150, vertical: 'bottom' }}
      >
        {customMenuItems
          ? customMenuItems.map((customMenuItem) => customMenuItem)
          : data?.map((item, index) => (
              <MenuItem
                key={index}
                onClick={handleClose}
                sx={{
                  minWidth: '150px',
                  backgroundColor: backgroundColor['primary'] + ' !important',
                }}
              >
                {item}
              </MenuItem>
            ))}
      </MenuStyled>
    </div>
  )
}

const MenuStyled = styled(Menu)({
  '& .MuiPaper-root': {
    backgroundColor: backgroundColor['primary'],
  },
})
