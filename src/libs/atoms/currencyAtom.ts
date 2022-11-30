import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { IChangeCurrency } from '@/libs/types'
const currencyAtomWithStorage = atomWithStorage('currency', <string>'USD')

const changeCurrencyAtom = atom<IChangeCurrency | null>(null)

export { changeCurrencyAtom, currencyAtomWithStorage }
