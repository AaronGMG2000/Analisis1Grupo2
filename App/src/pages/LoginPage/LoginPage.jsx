import { MovieCreationOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import { useUser } from 'hooks'
import { useLocation } from 'wouter'

function LoginPage() {
  const [, setLocation] = useLocation()
  const { handleLoginUser } = useUser()

  const handleFormValidation = (values) => {
    const errors = {}
    if (!values.username) errors.username = 'Usuario requerido'
    if (!values.password) errors.password = 'Contraseña requerida'

    return errors
  }

  const handleFormSubmit = (user, { setSubmitting }) => {
    handleLoginUser(user).then((ok) => {
      if (!ok) setSubmitting(false)
    })
  }

  const handleSignUpButton = () => {
    setLocation('/signup')
  }

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <MovieCreationOutlined />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Inicia sesión en Movies App
      </Typography>
      <Formik
        initialValues={{ username: '', password: '' }}
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
              error={errors.username && touched.username}
              helperText={touched.username && errors.username}
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
              error={errors.password && touched.password}
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
                Iniciar sesión
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                type='button'
                fullWidth
                variant='outlined'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSignUpButton}
              >
                ¿No tienes una cuenta?
              </Button>
            </Grid>
          </Box>
        )}
      </Formik>
    </>
  )
}

export default LoginPage
