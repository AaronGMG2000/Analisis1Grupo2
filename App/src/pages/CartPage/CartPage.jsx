import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { MovieDetail } from 'components'
import { Formik } from 'formik'
import { useCard, useCart } from 'hooks'
import { useLocation } from 'wouter'

function CartPage() {
  const [, setLocation] = useLocation()

  const { cartMovies, handleBuyCart, handleRemoveCartMovie } = useCart()
  const { cards } = useCard()

  const handleFormValidation = (values) => {
    const errors = {}
    if (!values.cardId) errors.cardId = 'Tarjeta requerida'
    if (!values.days) errors.days = 'Días a alquilar requerido'

    if (values.days < 10 || values.days > 60)
      errors.days = 'El número de días debe estar entre 10 y 60'

    const card = cards.find(({ id: cardId }) => cardId === values.cardId)
    const total = cartMovies.reduce(
      (acc, movie) => acc + movie.price * values.days,
      0
    )

    if (card && card.balance < total)
      errors.cardId = `Saldo insuficiente (Q.${card.balance.toFixed(2)})`

    return errors
  }

  const handleFormSubmit = (form, { setSubmitting }) => {
    handleBuyCart(form).then((ok) => {
      if (!ok) return setSubmitting(false)
      setLocation('/rent')
    })
  }

  return (
    <>
      <Typography component='h1' variant='h2' align='center'>
        Carrito de compras
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}
      >
        {cartMovies.map((movie) => (
          <Box
            key={movie.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3
            }}
          >
            <MovieDetail {...movie} />
            <Box>
              <Button
                disabled={false}
                type='button'
                variant='contained'
                color='error'
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleRemoveCartMovie({ movieId: movie.id })}
              >
                <Delete />
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      {cartMovies.length ? (
        <Formik
          initialValues={{
            cardId: '',
            days: 10
          }}
          validate={handleFormValidation}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <Box
              component='form'
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: '100%' }}
            >
              <Typography
                component='h1'
                variant='h5'
                align='right'
                sx={{ mb: '40px' }}
              >
                Total del carrito: Q.
                {cartMovies
                  .reduce((acc, movie) => acc + movie.price * values.days, 0)
                  .toFixed(2)}
              </Typography>
              <TextField
                required
                fullWidth
                label='Días a alquilar'
                margin='normal'
                name='days'
                type='number'
                min={10}
                max={60}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.days}
                error={errors.days && touched.days}
                helperText={touched.days && errors.days}
                sx={{
                  mb: '20px'
                }}
              />
              <FormControl fullWidth>
                <InputLabel id='card-label'>Tarjeta a debitar</InputLabel>
                <Select
                  required
                  fullWidth
                  label='Tarjeta a debitar'
                  labelId='card-label'
                  name='cardId'
                  onChange={handleChange}
                  value={values.cardId}
                  error={Boolean(errors.cardId)}
                >
                  {cards.map((card) => (
                    <MenuItem key={card.id} value={card.id}>
                      XXXX-XXXX-XXXX-{card.finalNumber}
                    </MenuItem>
                  ))}
                </Select>
                <Typography
                  variant='body2'
                  color='error.main'
                  sx={{
                    mt: '10px',
                    mb: '10px'
                  }}
                >
                  {errors.cardId}
                </Typography>
              </FormControl>
              <Button
                disabled={isSubmitting}
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Comprar carrito
              </Button>
            </Box>
          )}
        </Formik>
      ) : (
        <Box>
          <Typography component='h1' variant='h5' align='center'>
            No hay películas en el carrito
          </Typography>
        </Box>
      )}
    </>
  )
}

export default CartPage
