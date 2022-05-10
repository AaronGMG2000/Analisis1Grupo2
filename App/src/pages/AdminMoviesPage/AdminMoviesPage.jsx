import { Box, Typography } from '@mui/material'
import { moviesAtom } from 'atoms'
import { MovieCard } from 'components'
import { useAtom } from 'jotai'

function AdminMoviesPage() {
  const [movies] = useAtom(moviesAtom)

  return (
    <>
      <Typography component='h1' variant='h2' align='center'>
        Catálogo de películas
      </Typography>
      <Typography component='p' variant='body1' align='center'>
        Todas las películas del sistema.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '40px 5px',
          marginTop: '50px'
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </Box>
    </>
  )
}

export default AdminMoviesPage
