import { useAtom } from 'jotai'
import { userAtom, transferAtom } from 'atoms'
import { useRequest, useHistory, useRent } from 'hooks'
import { UserTransfer, Rent } from 'models'
import useAlert from 'hooks/useAlert'

function useTransfer() {
  const [user] = useAtom(userAtom)
  const [usersTransfer, setUsersTransfer] = useAtom(transferAtom)
  const request = useRequest('transfer')
  const requestRents = useRequest('payments')
  const { handleGetRents } = useRent()
  const { handleGetUserShoppings } = useHistory()
  const { handleOpenAlert } = useAlert()

  const handleGetUsersTransfer = (userId = user.id) =>
    request('GET', `/users`, null, false).then((response) => {
      setUsersTransfer(response.filter(usersTransfer => usersTransfer.id !== userId).map((usersTransfer) => new UserTransfer(usersTransfer)))
    })

  const handleValidateUserRents = (userId, movieId) =>
    requestRents('GET', `/buy/${userId}`, null, false)
      .then((response) => {
        const rents = response.map((rent) => new Rent(rent))
        let retorno = false
        if (rents.length > 0) {
          rents.forEach((rent) => {
            if (String(rent.movie.id) === movieId) {
              handleOpenAlert('El usuario seleccionado ya rento esta pelicula', 'error')
              retorno = true
            }
          })
        }
        return retorno
      })
      .catch(() => {
        return true
      })

  const handleTransferMovie = ({ rent, user1, user2 }) =>
    request('POST', '/', {
      id_alquiler: rent,
      id_usuario_origen: user1,
      id_usuario_destino: user2,
    })
      .then(() => {
        handleGetRents()
        handleGetUserShoppings()
        return true
      })
      .catch(() => {
        return false
      })

  return {
    usersTransfer,
    handleGetUsersTransfer,
    handleTransferMovie,
    handleValidateUserRents
  }

}

export default useTransfer
