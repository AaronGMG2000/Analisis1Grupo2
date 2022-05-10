import { Box, Button, Typography } from '@mui/material'
import { moviesAtom } from 'atoms'
import { useCart, useRent } from 'hooks'
import { useAtom } from 'jotai'
import { useLocation } from 'wouter'

function MoviePage({ params }) {
  const [, setLocation] = useLocation()

  const [movies = []] = useAtom(moviesAtom)

  const { id } = params
  const movie = movies.find(({ id: movieId }) => movieId === Number(id)) || {
    languages: []
  }

  const { isMovieInCart, handleAddCartMovie, handleRemoveCartMovie } = useCart()
  const { isMovieRented, rents } = useRent()
  const rent = rents.find((rent) => rent.movie.id === Number(id))

  const handleBuyButton = () => {
    setLocation(`/movie/${id}/buy`)
  }

  const handleTransferButton = () => {
    setLocation(`/movie/${id}/transfer`)
  }

  const handleAddToCartButton = () => {
    const form = { movieId: Number(id) }
    handleAddCartMovie(form)
  }

  const handleRemoveFromCartButton = () => {
    const form = { movieId: Number(id) }
    handleRemoveCartMovie(form)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '30px',
          mb: '30px'
        }}
      >
        <Box
          sx={{
            borderRadius: '5px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}
        >
          <img
            src={movie.picture}
            alt={movie.name}
            sx={{
              width: '100%',
              objectFit: 'cover'
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
          }}
        >
          <Typography component='h1' variant='h3'>
            {movie.name}
          </Typography>
          <Typography component='span' variant='body1'>
            Disponible en:{' '}
            {movie.languages.map((language) => language.name).join(', ')}
          </Typography>
          <Typography component='h1' variant='h5'>
            Precio de alquiler por día: {movie.formattedPrice}
          </Typography>
        </Box>
      </Box>
      {isMovieInCart(movie.id) ? (
        <>
          <Typography component='h1' variant='h5'>
            Película en carrito
          </Typography>
          <Button
            disabled={false}
            type='submit'
            fullWidth
            variant='contained'
            color='error'
            sx={{ mt: 3, mb: 2 }}
            onClick={handleRemoveFromCartButton}
          >
            Eliminar del carrito
          </Button>
        </>
      ) : isMovieRented(movie.id) ? (
        <>
          <Typography component='h1' variant='h5'>
            Película alquilada hasta: {rent.endDate.toLocaleDateString()}
          </Typography>
          <Button
            disabled={false}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={handleTransferButton}
          >
            Transferir película
          </Button>
        </>
      ) : (
        <>
          <Button
            disabled={false}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={handleBuyButton}
          >
            Alquilar película
          </Button>
          <Button
            disabled={false}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={handleAddToCartButton}
          >
            Agregar al carrito
          </Button>
        </>
      )}
    </>
  )
}

export default MoviePage
