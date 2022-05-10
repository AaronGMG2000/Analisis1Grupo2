import { atom } from 'jotai'
import { Alert } from 'models'

const userAtom = atom(new Alert())

export default userAtom
