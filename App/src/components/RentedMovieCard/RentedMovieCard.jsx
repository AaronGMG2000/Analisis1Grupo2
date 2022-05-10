import { Box, Typography } from '@mui/material'
import { useLocation } from 'wouter'

function RentedMovieCard({ rentDays, movie }) {
  const [, setLocation] = useLocation()

  const handleClick = () => {
    setLocation(`/movie/${movie.id}`)
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: '240px',
        padding: '20px',
        borderRadius: '10px',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
        },
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        cursor: 'pointer'
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
      <Typography
        variant='h6'
        sx={{
          mt: '15px'
        }}
      >
        {movie.name}
      </Typography>
      <Typography
        variant='h6'
        sx={{
          mt: '15px'
        }}
      >
        {rentDays >= 0
          ? `Quedan ${rentDays} días de alquiler`
          : 'Alquiler expirado'}
      </Typography>
    </Box>
  )
}

export default RentedMovieCard
