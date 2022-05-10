import { Container } from '@mui/material'
import { Alert, Navbar } from 'components'
import { useCard, useMovie, useRent, useUser, useHistory, useTransfer } from 'hooks'
import useCart from 'hooks/useCart'
import { useEffect } from 'react'
import { AppRouter } from 'routers'

function App() {
  const { user } = useUser()
  const { handleGetCards } = useCard()
  const { handleGetMovies } = useMovie()
  const { handleGetRents } = useRent()
  const { handleGetCartMovies } = useCart()
  const { handleGetUserShoppings } = useHistory()
  const { handleGetAllUserShoppings } = useHistory()
  const { handleGetUsersTransfer } = useTransfer()

  useEffect(() => {
    if (!user.isLoggedIn) return
    if (user.admin) {
      handleGetMovies()
      handleGetAllUserShoppings()
    } else {
      handleGetCards(user.id)
      handleGetMovies()
      handleGetRents(user.id)
      handleGetCartMovies(user.id)
      handleGetUserShoppings(user.id)
      handleGetUsersTransfer(user.id)
    }
  }, [user])

  return (
    <>
      <Navbar />
      <Alert />
      <Container
        component='main'
        sx={{
          py: 5,
          px: 25,
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <AppRouter />
      </Container>
    </>
  )
}

export default App
