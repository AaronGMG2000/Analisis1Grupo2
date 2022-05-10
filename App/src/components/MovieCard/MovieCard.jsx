import { Box, Typography } from '@mui/material'
import { useLocation } from 'wouter'

function MovieCard({ id, name, picture }) {
  const [, setLocation] = useLocation()

  const handleClick = () => {
    setLocation(`/movie/${id}`)
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
          src={picture}
          alt={name}
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
        {name}
      </Typography>
    </Box>
  )
}

export default MovieCard
