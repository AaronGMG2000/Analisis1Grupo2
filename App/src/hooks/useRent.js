import { useAtom } from 'jotai'
import { rentsAtom, userAtom } from 'atoms'
import { useCard, useRequest, useHistory } from 'hooks'
import { Rent } from 'models'

function useRent() {
  const [user] = useAtom(userAtom)
  const [rents, setRents] = useAtom(rentsAtom)

  const request = useRequest('payments')
  const { handleGetCards } = useCard()
  const { handleGetUserShoppings } = useHistory()

  const handleGetRents = (userId = user.id) =>
    request('GET', `/buy/${userId}`, null, false)
      .then((response) => {
        setRents(response.map((rent) => new Rent(rent)))
        return true
      })
      .catch(() => {
        return false
      })

  const handleRentMovie = ({ movieId, cardId, days }) =>
    request('POST', '/buy', {
      id_usuario: user.id,
      id_pelicula: movieId,
      id_tarjeta: cardId,
      dias_alquiler: days
    })
      .then(() => {
        handleGetRents()
        handleGetCards()
        handleGetUserShoppings()
        return true
      })
      .catch(() => {
        return false
      })

  const isMovieRented = (movieId) => {
    return rents.some((rent) => rent.movie.id === movieId)
  }

  return {
    rents,
    handleGetRents,
    handleRentMovie,
    isMovieRented
  }
}

export default useRent
