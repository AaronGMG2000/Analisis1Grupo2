import { useAtom } from 'jotai'
import { cartMoviesAtom, userAtom } from 'atoms'
import { useCard, useRent, useRequest, useHistory } from 'hooks'
import { Movie } from 'models'

function useCart() {
  const [user] = useAtom(userAtom)
  const [cartMovies, setCartMovies] = useAtom(cartMoviesAtom)

  const request = useRequest('payments')
  const { handleGetCards } = useCard()
  const { handleGetRents } = useRent()
  const { handleGetUserShoppings } = useHistory()

  const handleGetCartMovies = (userId = user.id) =>
    request('GET', `/cart/${userId}`, null, false)
      .then((response) => {
        setCartMovies(response.map((movie) => new Movie(movie)))
        return true
      })
      .catch(() => {
        return false
      })

  const handleAddCartMovie = ({ movieId }) =>
    request('POST', '/cart', {
      id_usuario: user.id,
      id_pelicula: movieId
    })
      .then(() => {
        handleGetCartMovies()
        return true
      })
      .catch(() => {
        return false
      })

  const handleRemoveCartMovie = ({ movieId }) =>
    request('DELETE', '/cart/delete/', {
      id_usuario: user.id,
      id_pelicula: movieId
    })
      .then(() => {
        handleGetCartMovies()
        return true
      })
      .catch(() => {
        return false
      })

  const handleBuyCart = ({ cardId, days }) =>
    request('POST', '/cart/buy', {
      id_usuario: user.id,
      id_tarjeta: cardId,
      dias_alquiler: days
    })
      .then(() => {
        handleGetCartMovies()
        handleGetRents()
        handleGetCards()
        handleGetUserShoppings()
        return true
      })
      .catch(() => {
        return false
      })

  const isMovieInCart = (movieId) => {
    return cartMovies.some((movie) => movie.id === movieId)
  }

  return {
    cartMovies,
    handleGetCartMovies,
    handleAddCartMovie,
    handleRemoveCartMovie,
    handleBuyCart,
    isMovieInCart
  }
}

export default useCart
