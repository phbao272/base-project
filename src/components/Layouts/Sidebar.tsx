import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined'
import LineAxisOutlinedIcon from '@mui/icons-material/LineAxisOutlined'
import SplitscreenIcon from '@mui/icons-material/Splitscreen'
import { Stack, Typography } from '@mui/material'

import { WhiteTypograpy } from './Layout'
export const Sidebar = () => {
  const sidebarList = [
    {
      name: 'All kind of currency',
      icon: <DashboardCustomizeOutlinedIcon sx={{ color: 'white' }} />,
    },
    {
      name: 'Exchange',
      icon: <CurrencyExchangeIcon sx={{ color: 'white' }} />,
    },
    {
      name: 'Comunity',
      icon: <DashboardCustomizeOutlinedIcon sx={{ color: 'white' }} />,
    },
    {
      name: 'Product',
      icon: <SplitscreenIcon sx={{ color: 'white' }} />,
    },
    {
      name: 'Study',
      icon: <LineAxisOutlinedIcon sx={{ color: 'white' }} />,
    },
    {
      name: 'Contact',
      icon: <DashboardCustomizeOutlinedIcon sx={{ color: 'white' }} />,
    },
  ]
  return (
    <Stack spacing={4} alignItems="flex-start" ml={3} mt={3}>
      {sidebarList.map((item, index) => (
        <Stack key={index} direction="row" alignItems="flex-start" spacing={2}>
          {item.icon}
          <WhiteTypograpy>{item.name}</WhiteTypograpy>
        </Stack>
      ))}
    </Stack>
  )
}
