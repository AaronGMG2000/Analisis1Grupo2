import { CreditCard } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { Formik } from 'formik'
import { useCard } from 'hooks'
import { useLocation } from 'wouter'

function AddCreditPage() {
  const [, setLocation] = useLocation()
  const { cards, handleAddFunds } = useCard()

  const handleFormValidation = (values) => {
    const errors = {}
    if (!values.cardId) errors.cardId = 'Tarjeta a recargar requerida'
    if (!values.amount) errors.amount = 'Cantidad a recargar requerida'

    if (values.amount < 1)
      errors.amount = 'La cantidad a recargar debe ser mayor a 0'

    return errors
  }

  const handleFormSubmit = (operation, { setSubmitting }) => {
    handleAddFunds(operation)
      .then((ok) => {
        if (!ok) return setSubmitting(false)
        setLocation('/profile')
      })
  }

  const handleCancelButton = () => {
    setLocation('/profile')
  }

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <CreditCard />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Añadir una tarjeta
      </Typography>
      <Formik
        initialValues={{
          cardId: '',
          amount: 100
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
            <FormControl fullWidth>
              <InputLabel id='card-label'>Tarjeta a recargar</InputLabel>
              <Select
                required
                fullWidth
                label='Tarjeta a recargar'
                labelId='card-label'
                name='cardId'
                onChange={handleChange}
                value={values.cardId}
                error={Boolean(errors.cardId)}
                sx={{
                  mb: '20px'
                }}
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
              <Typography
                variant='body2'
                sx={{
                  mb: '20px'
                }}
              >
                Saldo:{' '}
                {cards.find((card) => card.id === values.cardId)
                  ? cards.find((card) => card.id === values.cardId)
                      .formattedBalance
                  : 'Seleccione una tarjeta'}
              </Typography>
              <TextField
                required
                fullWidth
                label='Cantidad a recargar'
                margin='normal'
                name='amount'
                type='number'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.amount}
                error={errors.amount && touched.amount}
                helperText={touched.amount && errors.amount}
              />
              <Grid item xs={12} md={6}>
                <Button
                  disabled={isSubmitting}
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Añadir fondos
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  type='button'
                  fullWidth
                  variant='outlined'
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleCancelButton}
                >
                  Cancelar
                </Button>
              </Grid>
            </FormControl>
          </Box>
        )}
      </Formik>
    </>
  )
}

export default AddCreditPage
