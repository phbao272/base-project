import React from 'react'

import { Card } from '@/components/Card'
import { ListPost, PostForm } from '@/components/Interaction'

interface ICoinPost {
  coin_id: string
}

export const CoinPost: React.FC<ICoinPost> = ({ coin_id }) => {
  return (
    <div style={{ marginTop: '16px' }}>
      <Card title="tro chuyen cung bitcoin" hasMore={false}>
        <PostForm coin_id={coin_id} />
        <ListPost coin_id={coin_id} />
      </Card>
    </div>
  )
}
