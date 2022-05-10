import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'

import { Link } from 'components'
import { useUser } from 'hooks'
import { useLocation } from 'wouter'

function Navbar() {
  const [, setLocation] = useLocation()
  const { user, handleLogoutUser } = useUser()

  const links = user.isLoggedIn
    ? user.admin
      ? adminLinks
      : loggedInLinks
    : nonLoggedInLinks

  const handleLoginButton = () => {
    setLocation('/login')
  }

  const handleCartIcon = () => {
    setLocation('/cart')
  }

  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{
        borderBottom: (theme) => `4px solid ${theme.palette.divider}`,
        height: 64
      }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant='h4' fontWeight={600} noWrap sx={{ flexGrow: 1 }}>
          <Link to={user.isLoggedIn ? '/home' : '/login'}>Movies</Link>
        </Typography>
        {links.map(({ path, text }) => (
          <Link
            key={path}
            to={path}
            variant='button'
            color='text.primary'
            sx={{ fontSize: 13 }}
          >
            {text}
          </Link>
        ))}
        {user.isLoggedIn ? (
          <>
            {!user.admin && (
              <ShoppingCart
                sx={{
                  m: '0 20px',
                  cursor: 'pointer'
                }}
                onClick={handleCartIcon}
              />
            )}
            <Button
              variant='contained'
              color='error'
              sx={{ my: 1, mx: 1.5 }}
              onClick={handleLogoutUser}
            >
              Cerrar sesión
            </Button>
          </>
        ) : (
          <Button
            variant='contained'
            color='primary'
            sx={{ my: 1, mx: 1.5 }}
            onClick={handleLoginButton}
          >
            Iniciar sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

const nonLoggedInLinks = [
  {
    path: '/signup',
    text: 'Crear cuenta'
  }
]

const adminLinks = [
  {
    path: '/shoppingHistoryAdmin',
    text: 'Transacciones de usuarios'
  },
  {
    path: '/signup-admin',
    text: 'Crear cuenta de administrador'
  }
]

const loggedInLinks = [
  {
    path: '/profile',
    text: 'Mi perfil'
  },
  {
    path: '/rent',
    text: 'Mis películas'
  },
  {
    path: '/shoppingHistory',
    text: 'Historial de Compras'
  }
]

export default Navbar
