import { MovieCreationOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import { IS_DEVELOPMENT } from 'constants/APP'
import { Formik } from 'formik'
import { useUser } from 'hooks'
import { User } from 'models'
import { useLocation } from 'wouter'

function SignupPage() {
  const [, setLocation] = useLocation()
  const { handleSignupUser } = useUser()

  const handleFormValidation = (values) => {
    const errors = {}
    if (!values.username) errors.username = 'Usuario requerido'
    if (!values.email) errors.email = 'Correo requerido'
    if (!values.firstName) errors.firstName = 'Nombre requerido'
    if (!values.lastName) errors.lastName = 'Apellido requerido'
    if (!values.dpi) errors.dpi = 'DPI requerido'
    if (!values.age) errors.age = 'Edad requerida'
    if (!values.password) errors.password = 'Contraseña requerida'

    if (String(values.dpi).length !== 13)
      errors.dpi = 'El DPI debe tener 13 dígitos'
    if (values.age < 18 || values.age > 100)
      errors.age = 'La edad debe estar entre 18 y 100 años'
    if (!values.email.match(/^\S+@\S+\.\S+$/))
      errors.email = 'El correo no es válido'

    return errors
  }

  const handleFormSubmit = (user, { setSubmitting }) => {
    handleSignupUser(user).then((ok) => {
      if (!ok) return setSubmitting(false)
      setLocation('/login')
    })
  }

  const handleLoginButton = () => {
    setLocation('/login')
  }

  const initialValues = IS_DEVELOPMENT
    ? testUser
    : {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        dpi: '',
        age: '',
        password: ''
      }

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <MovieCreationOutlined />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Crea una cuenta en Movies App
      </Typography>
      <Formik
        initialValues={initialValues}
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
              label='Usuario'
              margin='normal'
              name='username'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              error={touched.username && !!errors.username}
              helperText={touched.username && errors.username}
            />
            <TextField
              fullWidth
              required
              label='Correo electrónico'
              margin='normal'
              name='email'
              type='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              required
              label='Nombre'
              margin='normal'
              name='firstName'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              error={touched.firstEmail && !!errors.firstEmail}
              helperText={touched.firstEmail && errors.firstEmail}
            />
            <TextField
              fullWidth
              required
              label='Apellido'
              margin='normal'
              name='lastName'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              error={touched.lastName && !!errors.lastName}
              helperText={touched.lastName && errors.lastName}
            />
            <TextField
              fullWidth
              required
              label='Edad'
              margin='normal'
              name='age'
              type='number'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.age}
              error={touched.age && !!errors.age}
              helperText={touched.age && errors.age}
            />
            <TextField
              fullWidth
              required
              label='DPI'
              margin='normal'
              name='dpi'
              type='number'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dpi}
              error={touched.dpi && !!errors.dpi}
              helperText={touched.dpi && errors.dpi}
            />
            <TextField
              fullWidth
              required
              label='Contraseña'
              margin='normal'
              name='password'
              type='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />
            <Grid item xs={12} md={6}>
              <Button
                disabled={isSubmitting}
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Crear cuenta
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                type='button'
                fullWidth
                variant='outlined'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLoginButton}
              >
                ¿Ya tienes una cuenta?
              </Button>
            </Grid>
          </Box>
        )}
      </Formik>
    </>
  )
}

const testUser = new User(
  1,
  'pablo',
  'pablo@email.com',
  'Pablo',
  'Cabrera',
  '1234567890123',
  21,
  false
)

export default SignupPage
