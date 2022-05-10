import { Box, Typography } from '@mui/material'
import { rentsAtom, transferAtom } from 'atoms'
import { RentedMovieCard } from 'components'
import { useAtom } from 'jotai'

function RentPage() {
  const [rents] = useAtom(rentsAtom)
  const [users] = useAtom(transferAtom)

  return (
    <>
      <Typography component='h1' variant='h2' align='center'>
        Tus películas alquiladas
      </Typography>
      <Typography component='p' variant='body1' align='center'>
        Consulta la información de las películas alquiladas o transfiere una de
        ellas.
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
        {rents.map((rent) => (
          <RentedMovieCard key={rent.id} {...rent} />
        ))}
      </Box>
    </>
  )
}

export default RentPage
