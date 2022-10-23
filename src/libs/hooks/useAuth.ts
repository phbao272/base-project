import { useAtom } from 'jotai'

import { userAtomWithStorage, userProfileImage } from '../atoms/authAtom'

const useAuth = () => {
  const [userStorage] = useAtom(userAtomWithStorage)
  const [userAvatar] = useAtom(userProfileImage)
  return { userStorage, userAvatar }
}

export { useAuth }
