import { Box, Typography } from '@mui/material'
import { userAtom, shoppingHistoryAdminAtom } from 'atoms'
import { useAtom } from 'jotai'

function ShoppingHistoryAdminPage() {
  const [user] = useAtom(userAtom)
  const [shops] = useAtom(shoppingHistoryAdminAtom)

  return (
    <>
      <Typography component='h1' variant='h4' align='center'>
        {user.username} - Historial de Transacciones de Usuarios
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
        {!shops.length && (
          <Typography variant='body1' align='center'>
            No existen compras registradas
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {shops.map((shop) => (
            <Box
              key={shop.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                width: '320px',
                border: '1px solid #aaa',
                borderRadius: '8px',
                p: '10px 20px'
              }}
            >
              <Typography component='h2' variant='h5' align='center'>
                {shop.pelicula}
              </Typography>
              <Typography component='h2' variant='h6'>
                {shop.tipo}
              </Typography>
              <Typography component='h2' variant='h6'>{parseDate_GetDate(shop.fecha)} | {parseDate_GetHour(shop.fecha)}</Typography>
              <Typography component='h2' variant='h6'>
                Usuario: {shop.usuario}
              </Typography>
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography component='span' variant='h6'>
                 Monto: Q.{shop.monto}
                </Typography>
                <Typography component='span' variant='h6'>
                 D??as: {shop.dias_alquiler}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}

function parseDate_GetDate(date){
  date = String(date).split('T');
  var days = String(date[0]);
  return days;
}

function parseDate_GetHour(date){
  date = String(date).split('T');
  var hour = String(date[1]);
  return hour;
}

export default ShoppingHistoryAdminPage
