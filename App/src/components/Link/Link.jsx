import { Link as MuiLink } from '@mui/material'
import { Link as WouterLink } from 'wouter'

function Link({ to, children, sx = {}, ...props }) {
  return (
    <WouterLink to={to}>
      <MuiLink sx={{ my: 1, mx: 1.5, ...sx }} {...props}>
        {children}
      </MuiLink>
    </WouterLink>
  )
}

export default Link
