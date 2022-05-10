import { CreditCard } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import { useCard } from 'hooks'
import { useLocation } from 'wouter'

function CardPage() {
  const [, setLocation] = useLocation()
  const { handleCreateCard } = useCard()

  const handleFormValidation = (values) => {
    const errors = {}
    if (!values.number) errors.number = 'Número de la tarjeta requerido'
    if (!values.name) errors.name = 'Nombre del titular requerido'
    if (!values.year) errors.expiration = 'Año de expiración requerida'
    if (!values.month) errors.expiration = 'Mes de expiración requerida'
    if (!values.balance) errors.balance = 'Saldo requerido'

    if (!values.number.match(/^\d{16}$/))
      errors.number = 'El número de la tarjeta debe tener 16 dígitos'

    if (values.year < 22 || values.year > 30)
      errors.year = 'Año de expiración inválido'
    if (values.month < 1 || values.month > 12)
      errors.month = 'Mes de expiración inválido'
    if (values.month < 4 && values.year <= 22) {
      errors.year = 'Fecha de expiración inválida'
      errors.month = 'Fecha de expiración inválida'
    }
    if (values.balance < 0) errors.balance = 'Saldo inválido'

    return errors
  }

  const handleFormSubmit = (card, { setSubmitting }) => {
    card.expiration = `${card.year}/${card.month}`
    handleCreateCard(card).then((ok) => {
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
          number: '',
          name: '',
          year: '23',
          month: '05',
          balance: ''
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
            <TextField
              fullWidth
              required
              label='Número de la tarjeta'
              margin='normal'
              name='number'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.number}
              error={errors.number && touched.number}
              helperText={touched.number && errors.number}
            />
            <TextField
              fullWidth
              required
              label='Nombre del titular'
              margin='normal'
              name='name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={errors.name && touched.name}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              required
              label='Saldo disponible'
              margin='normal'
              name='balance'
              type='number'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.balance}
              error={errors.balance && touched.balance}
              helperText={touched.balance && errors.balance}
            />
            <TextField
              required
              label='Año de expiración'
              margin='normal'
              name='year'
              type='number'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.year}
              error={errors.year && touched.year}
              helperText={touched.year && errors.year}
              style={{ width: '50%', paddingRight: '20px' }}
            />
            <TextField
              required
              label='Mes de expiración'
              margin='normal'
              name='month'
              type='number'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.month}
              error={errors.month && touched.month}
              helperText={touched.month && errors.month}
              style={{ width: '50%' }}
            />
            <Grid item xs={12} md={6}>
              <Button
                disabled={isSubmitting}
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Añadir tarjeta
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
          </Box>
        )}
      </Formik>
    </>
  )
}

export default CardPage
