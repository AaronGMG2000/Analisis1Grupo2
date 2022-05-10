import { Box, Typography } from '@mui/material'
import { useLocation } from 'wouter'

function MovieDetail({ id, name, picture, formattedPrice }) {
  const [, setLocation] = useLocation()

  const handleClick = () => {
    setLocation(`/movie/${id}`)
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        padding: '20px',
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
          style={{
            height: '120px',
            objectFit: 'cover'
          }}
        />
      </Box>

      <Box>
        <Typography component='h1' variant='h5'>
          {name}
        </Typography>
        <Typography component='h1' variant='h6'>
          Precio de alquiler por día: {formattedPrice}
        </Typography>
      </Box>
    </Box>
  )
}

export default MovieDetail
