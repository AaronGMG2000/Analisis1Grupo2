import { useAtom } from 'jotai'
import { moviesAtom, userAtom, languagesAtom } from 'atoms'
import { useRequest } from 'hooks'
import { Language, Movie } from 'models'

function useMovie() {
  const [user] = useAtom(userAtom)
  const [movies, setMovies] = useAtom(moviesAtom)
  const [languages, setLanguages] = useAtom(languagesAtom)
  const request = useRequest('movie')

  const handleGetMovies = () =>
    request('GET', '/movie', null, false)
      .then((response) => {
        setMovies(response.map((movie) => new Movie(movie)))
        return true
      })
      .catch(() => {
        return false
      })

  const handleGetLanguages = () =>
    request('GET', `/language/${user.id}`, null, false)
      .then((response) => {
        setLanguages(response.map((language) => new Language(language)))
        return true
      })
      .catch(() => {
        return false
      })

  return {
    movies,
    languages,
    handleGetMovies,
    handleGetLanguages
  }
}

export default useMovie
