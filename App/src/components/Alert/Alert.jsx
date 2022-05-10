import { Alert as MuiAlert, Snackbar } from '@mui/material'

import { useAlert } from 'hooks'

function Alert(props) {
  const { alert, handleCloseAlert } = useAlert()
  const { opened, message, severity } = alert

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      autoHideDuration={5000}
      onClose={handleCloseAlert}
      open={opened}
    >
      <MuiAlert
        color={severity}
        onClose={handleCloseAlert}
        severity={severity}
        sx={{ width: '100%' }}
        {...props}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  )
}

export default Alert
