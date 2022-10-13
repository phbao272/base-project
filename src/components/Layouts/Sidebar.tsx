import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined'
import LineAxisOutlinedIcon from '@mui/icons-material/LineAxisOutlined'
import SplitscreenIcon from '@mui/icons-material/Splitscreen'
import { Stack } from '@mui/material'

import i18n from '@/libs/lang/translations/i18n'
// import { Link } from 'react-router-dom'
import { CustomLink, SidebarMenuItem, WhiteTypograpy, yellow } from '@/styles'

export const sidebarList = [
  {
    name: i18n.t('sidebar.all_kind_of_currency'),
    icon: <DashboardCustomizeOutlinedIcon sx={{ color: 'white' }} />,
    link: '#',
  },
  {
    name: i18n.t('sidebar.exchange'),
    icon: <CurrencyExchangeIcon sx={{ color: 'white' }} />,
    link: '#',
  },
  {
    name: i18n.t('sidebar.comunity'),
    icon: <DashboardCustomizeOutlinedIcon sx={{ color: 'white' }} />,
    link: '#',
  },
  {
    name: i18n.t('sidebar.product'),
    icon: <SplitscreenIcon sx={{ color: 'white' }} />,
    link: '#',
  },
  {
    name: i18n.t('sidebar.contact'),
    icon: <DashboardCustomizeOutlinedIcon sx={{ color: 'white' }} />,
    link: '#',
  },
  {
    name: i18n.t('sidebar.view_demo_chart'),
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
