import { useAtom } from 'jotai'
import { userAtom } from 'atoms'
import { useRequest } from 'hooks'

function useUser() {
  const [user, setUser] = useAtom(userAtom)
  const request = useRequest('user')

  const handleLoginUser = ({ username, password }) =>
    request('POST', '/login', {
      usuario: username,
      contrasena: password
    })
      .then((response) => {
        setUser(user.login(response))
        return true
      })
      .catch(() => {
        return false
      })

  const handleSignupUser = ({
    username,
    email,
    firstName,
    lastName,
    dpi,
    age,
    password,
    admin = false
  }) =>
    request('POST', '/register', {
      usuario: username,
      correo: email,
      nombre: firstName,
      apellido: lastName,
      dpi,
      edad: age,
      contrasena: password,
      admin
    })
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })

  const handleSignupUserAdmin = ({
    username,
    email,
    firstName,
    lastName,
    dpi,
    age,
    password,
    admin = true
  }) =>
    request('POST', '/register', {
      usuario: username,
      correo: email,
      nombre: firstName,
      apellido: lastName,
      dpi,
      edad: age,
      contrasena: password,
      admin
    })
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })
  const handleLogoutUser = () => setUser(user.logout())

  return {
    user,
    handleLoginUser,
    handleSignupUser,
    handleLogoutUser,
    handleSignupUserAdmin
  }
}

export default useUser
