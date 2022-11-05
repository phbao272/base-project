import { request } from '../request'

export const loginWithGG = async (url: string, data: any) => {
  const res = await request.post(`${url}`, data)
  return res
}

export const getMe = async () => {
  const res = await request.get('/me')
  return res
}

export const getGoogleLoginUrl = async (name: string) => {
  const res = await request.get(`${name}`)
  return res.data
}
