import { styled, Tab, tabClasses, TabProps, Tabs, tabsClasses } from '@mui/material'

export const TabsStyled = styled(Tabs, {
  shouldForwardProp: (prop) => prop !== 'numberOfTab',
})<{ numberOfTab?: number }>(({ theme, value, numberOfTab = 3 }) => {
  const threeTabStyle = [
    {
      nthType: 1,
      enableWhenValueEqual: 2,
      width: 120,
    },
    {
      nthType: 2,
      enableWhenValueEqual: 0,
      width: 120,
    },
    {
      nthType: 3,
      enableWhenValueEqual: -1,
      width: 120,
    },
  ].reduce((acc, config) => {
    acc[`&:nth-of-type(${config.nthType})`] = {
      '&:after': {
        content: '""',
        display: 'block',
        visibility: value === config.enableWhenValueEqual ? 'visible' : 'hidden',
        height: 14,
        width: 1,
        backgroundColor: '#DDDDDD',
        position: 'absolute',
        right: 0,
      },
      width: config.width,
    }
    return acc
  }, {} as Record<string, unknown>)

  const twoTabStyle = {
    '&:nth-of-type(1)': {
      width: 52,
    },
    '&:nth-of-type(2)': {
      width: 120,
    },
  }

  const isThreeTab = numberOfTab === 3

  return {
    [`& .${tabsClasses.indicator}`]: {
      top: 3,
      bottom: 3,
      height: 'auto',
      background: 'none',

      '&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        boxShadow: theme.shadows[1],
      },
    },
    [`& .${tabsClasses.flexContainer}`]: {
      display: 'inline-flex',
      position: 'relative',
      zIndex: 1,
      padding: theme.spacing(0, 0.5),
      width: '100%',
      button: isThreeTab ? threeTabStyle : twoTabStyle,
      gap: 4,
    },
    backgroundColor: theme.palette.primary.light,
    height: 38,
    minHeight: 38,
    borderRadius: 4,
  }
})

export const TabStyled = styled((props: TabProps) => <Tab disableRipple {...props} />, {
  shouldForwardProp: (prop) => prop !== 'divider',
})(({ theme }) => ({
  [`&.${tabClasses.selected}`]: {
    fontWeight: 700,
    color: theme.palette.text.primary,
  },
  minHeight: 32,
  zIndex: 2,
  minWidth: 0,
  color: theme.palette.text.primary,
  padding: 0,
  top: 4,
}))
