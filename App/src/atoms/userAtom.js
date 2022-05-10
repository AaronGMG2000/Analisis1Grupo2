import { atom } from 'jotai'
import { User } from 'models'

const userJson = localStorage.getItem('movies-user')
const initialUser = !userJson ? new User() : new User().recover(JSON.parse(userJson))

const userAtom = atom(initialUser)

export default userAtom
