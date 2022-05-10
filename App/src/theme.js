import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1565c0'
    },
    secondary: {
      main: '#82b1ff'
    },
    background: {
      default: '#212121',
      paper: '##1d1d31'
    },
    error: {
      main: '#ef9a9a'
    },
    warning: {
      main: '#ffb74d'
    },
    info: {
      main: '#64b5f6'
    },
    success: {
      main: '#81c784'
    },
    divider: 'rgba(255,255,255,0.12)'
  }
})

export default theme
