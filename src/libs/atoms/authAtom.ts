import { atom } from 'jotai'

import { UserType } from '../types/user'

const userAtom = atom<UserType | null>(null)

export { userAtom }
