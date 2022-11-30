import { Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Card } from '@/components/Card'
import { ArrowDropDownIcon, ArrowDropUpIcon } from '@/components/Icons'
import { blue, BoxFlexCenter } from '@/styles'

interface IBoxDescription {
  desc: string
}

const LINE_HEIGHT = 24

const webkitBox = {
  WebkitBoxOrient: 'vertical',
  display: '-webkit-box',
  overflow: 'hidden',
}

export const BoxDescription: React.FC<IBoxDescription> = ({ desc }) => {
  const { t } = useTranslation()
  const textRef = useRef<HTMLDivElement>(null)
  const [numberOfLine, setNumberOfLine] = useState<number>(0)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    setNumberOfLine(
      Math.round(
        (textRef.current?.clientHeight || textRef.current?.offsetHeight || 0) / LINE_HEIGHT,
      ),
    )
  }, [textRef.current])

  const lineHasSeeMore = isMobile ? true : numberOfLine > 5

  return (
    <Card title={t('description')} hasMore={false}>
      <Typography sx={{ WebkitLineClamp: isExpanded ? 'unset' : isMobile ? 4 : 5, ...webkitBox }}>
        <span ref={textRef} dangerouslySetInnerHTML={{ __html: desc }} />
      </Typography>
      {lineHasSeeMore && (
        <Typography
          sx={{
            textAlign: 'center',
            marginTop: '12px',
            fontSize: '12px',
            fontWeight: 500,
            color: blue['primary'],
            cursor: 'pointer',
          }}
          onClick={handleExpand}
        >
          {isExpanded ? (
            <BoxFlexCenter sx={{ textAlign: 'center' }}>
              {t('hide')} <ArrowDropUpIcon height="20px" width="20px" />
            </BoxFlexCenter>
          ) : (
            <BoxFlexCenter sx={{ textAlign: 'center' }}>
              {t('see_more')} <ArrowDropDownIcon height="20px" width="20px" />
            </BoxFlexCenter>
          )}
        </Typography>
      )}
    </Card>
  )
}
