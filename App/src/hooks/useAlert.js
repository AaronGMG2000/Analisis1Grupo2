import { alertAtom } from 'atoms'
import { useAtom } from 'jotai'

function useAlert() {
  const [alert, setAlert] = useAtom(alertAtom)

  const handleOpenAlert = (message, severity = 'success') =>
    setAlert(alert.open(message, severity))

  const handleCloseAlert = (ev, reason) => {
    if (reason === 'clickaway') return
    setAlert(alert.close())
  }

  return { alert, handleOpenAlert, handleCloseAlert }
}

export default useAlert
