import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { UserType } from '../types/user'

const userAtom = atom<UserType | null>(null)
const userAtomWithStorage = atomWithStorage('user', <UserType | null>null)

export { userAtom, userAtomWithStorage }
