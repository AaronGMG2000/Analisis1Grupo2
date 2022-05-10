import { Redirect, Route, Switch } from 'wouter'

import { useUser } from 'hooks'
import {
  AddCreditPage,
  AdminMoviePage,
  AdminMoviesPage,
  AdminUsersPage,
  BuyMoviePage,
  CardPage,
  CartPage,
  HistoryPage,
  LoginPage,
  MoviePage,
  MoviesPage,
  ProfilePage,
  RentPage,
  SignupPage,
  SignupAdminPage,
  TransferPage,
  ShoppingHistoryPage,
  ShoppingHistoryAdminPage
} from 'pages'

function AppRouter() {
  const { user } = useUser()
  const routes = user.isLoggedIn
    ? user.admin
      ? adminRoutes
      : loggedInRoutes
    : nonLoggedInRoutes

  return (
    <Switch>
      {routes.map(({ path, component }) => (
        <Route key={path} path={path} component={component} />
      ))}
    </Switch>
  )
}

const loggedInRoutes = [
  {
    path: '/add-credit',
    component: AddCreditPage
  },
  {
    path: '/admin/movies',
    component: AdminMoviesPage
  },
  {
    path: '/admin/users',
    component: AdminUsersPage
  },
  {
    path: '/movie/:id/buy',
    component: BuyMoviePage
  },
  {
    path: '/card',
    component: CardPage
  },
  {
    path: '/cart',
    component: CartPage
  },
  {
    path: '/history',
    component: HistoryPage
  },
  {
    path: '/home',
    component: MoviesPage
  },
  {
    path: '/movie/:id',
    component: MoviePage
  },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/rent',
    component: RentPage
  },
  {
    path: '/movie/:id/transfer',
    component: TransferPage
  },
  {
    path: '/shoppingHistory',
    component: ShoppingHistoryPage
  },
  {
    path: '',
    component: () => <Redirect to='/home' />
  }
]

const adminRoutes = [
  {
    path: '/home',
    component: AdminMoviesPage
  },
  {
    path: '/movie/:id',
    component: AdminMoviePage
  },
  {
    path: '/shoppingHistoryAdmin',
    component: ShoppingHistoryAdminPage
  },
  {
    path: '/signup-admin',
    component: SignupAdminPage
  },
  {
    path: '',
    component: () => <Redirect to='/home' />
  }
]

const nonLoggedInRoutes = [
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/signup',
    component: SignupPage
  },
  {
    path: '',
    component: () => <Redirect to='/login' />
  }
]

export default AppRouter
