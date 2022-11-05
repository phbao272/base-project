import { atomWithStorage } from 'jotai/utils'

import { ProfileImage, UserType } from '../types/user'

// const userAtom = atom<UserType | null>(null)
const userAtomWithStorage = atomWithStorage('user', <UserType | null>null)
const userProfileImage = atomWithStorage('profile-image', <ProfileImage | null | undefined>null)
export { userAtomWithStorage, userProfileImage }
