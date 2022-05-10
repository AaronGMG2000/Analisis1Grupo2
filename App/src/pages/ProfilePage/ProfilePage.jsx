import { Box, Button, TextField, Typography } from '@mui/material'
import { cardsAtom, userAtom } from 'atoms'
import { useAtom } from 'jotai'
import { useLocation } from 'wouter'

function ProfilePage() {
  const [, setLocation] = useLocation()
  const [user] = useAtom(userAtom)
  const [cards] = useAtom(cardsAtom)

  const handleAddCardButton = () => {
    setLocation('/card')
  }

  const handleAddFundsButton = () => {
    setLocation('/add-credit')
  }

  return (
    <>
      <Typography component='h1' variant='h2' align='center'>
        {user.username}
      </Typography>
      <Typography component='h1' variant='h4' align='left'>
        Datos personales
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '20px'
        }}
      >
        <TextField
          fullWidth
          readOnly
          label='Correo electrónico'
          margin='normal'
          value={user.email}
        />
        <TextField
          fullWidth
          readOnly
          label='Nombre completo'
          margin='normal'
          value={`${user.firstName} ${user.lastName}`}
        />
        <TextField
          fullWidth
          readOnly
          label='DPI'
          margin='normal'
          value={user.dpi}
        />
        <TextField
          fullWidth
          readOnly
          label='Edad'
          margin='normal'
          value={user.age}
        />
      </Box>
      <Typography component='h1' variant='h4' align='left'>
        Tarjetas
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '20px'
        }}
      >
        {!cards.length && (
          <Typography variant='body1' align='center'>
            No tienes tarjetas registradas
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {cards.map((card) => (
            <Box
              key={card.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                width: '280px',
                border: '1px solid #aaa',
                borderRadius: '8px',
                p: '10px 20px'
              }}
            >
              <Typography component='h2' variant='h6'>
                XXXX-XXXX-XXXX-{card.finalNumber}
              </Typography>
              <Typography>{card.name}</Typography>
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography component='span' variant='h5'>
                  {card.expiration}
                </Typography>
                <Typography component='span' variant='h5'>
                  {card.formattedBalance}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Button
          type='button'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          onClick={handleAddCardButton}
        >
          Añadir una tarjeta
        </Button>
        <Button
          type='button'
          fullWidth
          disabled={!cards.length}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          onClick={handleAddFundsButton}
        >
          Recargar fondos
        </Button>
      </Box>
    </>
  )
}

export default ProfilePage
