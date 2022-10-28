import { Stack } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'

import { useAuth } from '@/libs/hooks'
import { IPost } from '@/libs/types'
import { backgroundColor } from '@/styles'

import { Post } from './Post'
interface IListPost {
  coin_id: string
}

interface IListPostResponse {
  data: IPost[]
}

export const ListPost: React.FC<IListPost> = ({ coin_id }) => {
  const { userStorage } = useAuth()

  const { data: posts, isLoading } = useQuery<IListPostResponse>([
    `post/get-by-coin-id/${coin_id}?user_id=${userStorage?.id}`,
  ])

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        !!posts?.data?.length && (
          <Stack
            sx={{
              backgroundColor: backgroundColor['post'],
              padding: '20px',
              borderRadius: '8px',
              marginTop: '24px',
              gap: '32px',
            }}
          >
            {posts.data.map((item: IPost) => (
              <Post key={item.id} {...item} />
            ))}
          </Stack>
        )
      )}
    </>
  )
}
