import { Box, Typography } from '@mui/material'
import { moviesAtom } from 'atoms'
import { MovieCard } from 'components'
import { useAtom } from 'jotai'

function MoviesPage() {
  const [movies] = useAtom(moviesAtom)
  const activeMovies = movies.filter((movie) => movie.active)

  return (
    <>
      <Typography component='h1' variant='h2' align='center'>
        Películas disponibles
      </Typography>
      <Typography component='p' variant='body1' align='center'>
        Renta una película al instante o añadela a tu carrito de compras.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '40px 5px',
          marginTop: '50px'
        }}
      >
        {activeMovies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </Box>
    </>
  )
}

export default MoviesPage
