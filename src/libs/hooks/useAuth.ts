import { useAtom } from 'jotai'

import { userAtom, userAtomWithStorage } from '../atoms/authAtom'

const useAuth = () => {
  const [user] = useAtom(userAtom)
  const [userStorage] = useAtom(userAtomWithStorage)
  return { user, userStorage }
}

export { useAuth }
