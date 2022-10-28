import { Box } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'

import { Comment, CommentForm } from '@/components/Interaction'
import { IComment } from '@/libs/types'

interface IListCommentProps {
  post_id: string | number
  coin_id: string | number
  user_name: string
}

interface IListCommentResponse {
  data: IComment[]
}

export const ListComment: React.FC<IListCommentProps> = ({ post_id, coin_id, user_name }) => {
  const { data: comments, isLoading } = useQuery<IListCommentResponse>([
    `comment/get-by-post-id/${post_id}`,
  ])

  console.log({ comments })

  return (
    <>
      <Box mb="12px">
        <CommentForm post_id={post_id} coin_id={coin_id} user_name={user_name} />
      </Box>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        comments?.data &&
        comments.data.map((item: IComment) => <Comment key={item.id} coin_id={coin_id} {...item} />)
      )}
    </>
  )
}
