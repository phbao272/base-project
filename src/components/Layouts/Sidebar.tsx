import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined'
import LineAxisOutlinedIcon from '@mui/icons-material/LineAxisOutlined'
import SplitscreenIcon from '@mui/icons-material/Splitscreen'
import { Stack } from '@mui/material'

// import { Link } from 'react-router-dom'
import { CustomLink, SidebarMenuItem, WhiteTypograpy, yellow } from '@/styles'

export const sidebarList = [
  {
    name: 'All kind of currency',
    icon: <DashboardCustomizeOutlinedIcon sx={{ color: 'white' }} />,
    link: '#',
  },
  {
    name: 'Exchange',
    icon: <CurrencyExchangeIcon sx={{ color: 'white' }} />,
    link: '#',
  },
  {
    name: 'Comunity',
    icon: <DashboardCustomizeOutlinedIcon sx={{ color: 'white' }} />,
    link: '#',
  },
  {
    name: 'Product',
    icon: <SplitscreenIcon sx={{ color: 'white' }} />,
    link: '#',
  },
  {
    name: 'Contact',
    icon: <DashboardCustomizeOutlinedIcon sx={{ color: 'white' }} />,
    link: '#',
  },
  {
    name: 'VIEW DEMO CHART',
    icon: <LineAxisOutlinedIcon sx={{ color: 'white' }} />,
    link: '/chart',
    sxCustom: { color: yellow['primary'] },
  },
]

export const Sidebar = () => {
  return (
    <Stack spacing={3} alignItems="flex-start" ml={1} mt={1}>
      {sidebarList.map((item, index) => (
        <CustomLink href={item.link} key={index}>
          <SidebarMenuItem>
            {item.icon}
            <WhiteTypograpy sx={{ ml: 2, ...item?.sxCustom }}>{item.name}</WhiteTypograpy>
          </SidebarMenuItem>
        </CustomLink>
      ))}
    </Stack>
  )
}
