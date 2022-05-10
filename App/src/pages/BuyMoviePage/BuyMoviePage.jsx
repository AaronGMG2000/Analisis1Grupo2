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
import { cardsAtom, moviesAtom } from 'atoms'
import { Formik } from 'formik'
import { useRent } from 'hooks'
import { useAtom } from 'jotai'
import { useLocation } from 'wouter'

function BuyMoviePage({ params }) {
  const [, setLocation] = useLocation()

  const [cards = []] = useAtom(cardsAtom)
  const [movies = []] = useAtom(moviesAtom)

  const { id } = params
  const movie = movies.find(({ id: movieId }) => movieId === Number(id)) || {
    languages: []
  }

  const { handleRentMovie } = useRent()

  const handleFormValidation = (values) => {
    const errors = {}
    if (!values.cardId) errors.cardId = 'Tarjeta requerida'
    if (!values.days) errors.days = 'Días a alquilar requerido'

    if (values.days < 10 || values.days > 60)
      errors.days = 'El número de días debe estar entre 10 y 60'

    const card = cards.find(({ id: cardId }) => cardId === values.cardId)
    if (card && card.balance < movie.price * values.days)
      errors.cardId = `Saldo insuficiente (Q.${card.balance.toFixed(2)})`

    return errors
  }

  const handleFormSubmit = (form, { setSubmitting }) => {
    form.movieId = Number(id)

    handleRentMovie(form).then((ok) => {
      if (!ok) return setSubmitting(false)
      setLocation(`/movie/${id}`)
    })
  }

  const handleCancelButton = () => {
    setLocation(`/movie/${id}`)
  }

  return (
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
              <Typography component='h1' variant='h5'>
                Precio total: {`Q.${(movie.price * values.days).toFixed(2)}`}
              </Typography>
            </Box>
          </Box>
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
          >
            Alquilar película
          </Button>
          <Button
            disabled={isSubmitting}
            type='button'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={handleCancelButton}
          >
            Cancelar
          </Button>
        </Box>
      )}
    </Formik>
  )
}

export default BuyMoviePage
