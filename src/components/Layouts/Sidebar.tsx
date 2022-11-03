import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined'
import LineAxisOutlinedIcon from '@mui/icons-material/LineAxisOutlined'
import SplitscreenIcon from '@mui/icons-material/Splitscreen'
import { Grid, Tooltip } from '@mui/material'

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
  const browserWidth = window.innerWidth
  return (
    <Grid container spacing={4}>
      {sidebarList.map((item, index) => (
        <Grid key={index} item xs={12}>
          <CustomLink to={item.link}>
            <Tooltip followCursor title={item.name} arrow placement="bottom-end">
              <SidebarMenuItem>
                {item.icon}
                <WhiteTypograpy
                  sx={{
                    ml: 2,
                    ...item?.sxCustom,
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {item.name}
                </WhiteTypograpy>
              </SidebarMenuItem>
            </Tooltip>
          </CustomLink>
        </Grid>
      ))}
    </Grid>
  )
}
