import React, { Children } from 'react'
import { Backdrop } from '@mui/material'

const Modal = ({children}) => {
  return (
<Backdrop
  sx={{ color: '#fff', zIndex: "100" }}
  open={true}
>{children}</Backdrop>
  )
}

export default Modal
