import React, { CSSProperties } from 'react'

import { backgroundColor } from '@/styles'

interface IChip {
  content: string | React.ReactNode
  isOutline?: boolean
  sx?: CSSProperties
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  hasHover?: boolean
  hasDropDown?: boolean
}

export const Chip: React.FC<IChip> = ({
  content,
  isOutline = false,
  sx,
  startIcon,
  endIcon,
  hasHover = false,
}) => {
  return (
    <span
      style={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4px 12px',
        fontSize: 12,
        fontWeight: 400,
        color: 'rgba(255, 255, 255, 0.7)',
        maxWidth: 'max-content',
        borderRadius: 8,
        minHeight: '37px',
        background: isOutline ? backgroundColor['primary'] : backgroundColor['chip'],
        border: isOutline ? '1px solid #636778' : 'unset',
        gap: '4px',
        cursor: hasHover ? 'pointer' : 'unset',
        // '&:hover': {
        //   backgroundColor: hasHover ? backgroundColor['chipHover'] : backgroundColor['chip'],
        // },
        ...sx,
      }}
    >
      {startIcon && startIcon}
      {content}
      {endIcon && endIcon}
    </span>
  )
}
