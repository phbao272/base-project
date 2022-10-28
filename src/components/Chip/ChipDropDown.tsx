import React, { CSSProperties, useMemo } from 'react'

import { DropDown } from '@/components/DropDown'

import { Chip } from './Chip'

interface IChipDropDowm {
  content: string | React.ReactNode
  isOutline?: boolean
  sx?: CSSProperties
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  hasHover?: boolean

  data: string[] | [string, string][]
  customMenu?: any
}

export const ChipDropDown: React.FC<IChipDropDowm> = ({ data, customMenu, ...props }) => {
  // console.log(data)

  const customMenuItems = useMemo(() => {
    if (!customMenu || !data) {
      return null
    }

    return data.map((item, index) => {
      return customMenu(item, index)
    })
  }, [data])

  return (
    <>
      <DropDown
        data={data}
        customMenuItems={customMenuItems}
        button={<Chip {...props} hasHover={true} />}
      />
    </>
  )
}
