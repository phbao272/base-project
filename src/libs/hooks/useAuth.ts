import { useAtom } from 'jotai'

import { userAtom } from '../atoms/authAtom'

const useAuth = () => {
  const [user] = useAtom(userAtom)
  return { user }
}

export { useAuth }
