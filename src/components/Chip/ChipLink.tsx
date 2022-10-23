import React, { CSSProperties } from 'react'

import { CustomLinkMUI } from '@/styles'

import { Chip } from './Chip'
interface IChipLink {
  content: string | React.ReactNode
  isOutline?: boolean
  sx?: CSSProperties
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  link: string
  hasHover?: boolean
}

export const ChipLink: React.FC<IChipLink> = ({ link, ...props }) => {
  return (
    <CustomLinkMUI href={link} target="_blank" rel="noreferrer">
      <Chip {...props} />
    </CustomLinkMUI>
  )
}
