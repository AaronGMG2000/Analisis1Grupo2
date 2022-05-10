import { Box, Typography } from '@mui/material'
import { moviesAtom } from 'atoms'
import { useAtom } from 'jotai'

function AdminMoviePage({ params }) {
  const { id } = params

  const [movies = []] = useAtom(moviesAtom)
  const movie = movies.find(({ id: movieId }) => movieId === Number(id)) || {
    languages: []
  }

  return (
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
        <Typography
          component='h1'
          variant='h6'
          sx={{
            color: movie.active ? 'success.main' : 'error.main'
          }}
        >
          Película disponible: {movie.active ? 'Sí' : 'No'}
        </Typography>
      </Box>
    </Box>
  )
}

export default AdminMoviePage
