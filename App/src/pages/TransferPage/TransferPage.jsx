import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import { moviesAtom, userAtom, transferAtom } from 'atoms'
import { Formik } from 'formik'
import { useRent, useTransfer } from 'hooks'
import { useAtom } from 'jotai'
import { useLocation } from 'wouter'

function TransferPage({ params }) {
  const [, setLocation] = useLocation()

  const [movies = []] = useAtom(moviesAtom)

  const { id } = params
  const movie = movies.find(({ id: movieId }) => movieId === Number(id)) || {
    languages: []
  }

  const { rents } = useRent()
  const rent = rents.find((rent) => rent.movie.id === Number(id))

  const [user] = useAtom(userAtom)
  const [usersTransfer] = useAtom(transferAtom)

  const { handleTransferMovie, handleValidateUserRents } = useTransfer()

  const handleFormValidation = (values) => {
    const errors = {}
    if (!values.userTransferId) errors.userTransferId = 'Seleccione un usuario'
    return errors
  }

  const handleFormSubmit = (form, { setSubmitting }) => {
    handleValidateUserRents(form.userTransferId, id).then((result) => {
      if (result) return
      const objectR = {
        rent: rent.id,
        user1: user.id,
        user2: form.userTransferId
      }
      handleTransferMovie(objectR).then((ok) => {
        if (!ok) return setSubmitting(false)
        setLocation(`/movie/${id}`)
      })
    })
  }

  const handleCancelButton = () => {
    setLocation(`/movie/${id}`)
  }

  return (
    <Formik
      initialValues={{
        userTransferId: ''
      }}
      validate={handleFormValidation}
      onSubmit={handleFormSubmit}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
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
              <Typography component='h1' variant='h3'>
                Transferencia a otros usuarios
              </Typography>
            </Box>
          </Box>
          <FormControl fullWidth>
            <InputLabel id='userTransfer-label'>
              Usuario a transferir
            </InputLabel>
            <Select
              required
              fullWidth
              label='Usuario a transferir'
              labelId='userTransfer-label'
              name='userTransferId'
              onChange={handleChange}
              value={values.userTransferId}
              error={Boolean(errors.userTransferId)}
            >
              {usersTransfer.map((userToTransfer) => (
                <MenuItem key={userToTransfer.id} value={userToTransfer.id}>
                  {userToTransfer.usuario}
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
              {errors.userTransferId}
            </Typography>
          </FormControl>
          <Button
            disabled={false}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Confirmar Transferencia
          </Button>
          <Button
            disabled={false}
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

export default TransferPage
