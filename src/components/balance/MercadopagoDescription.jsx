import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

import {useGetMPOrder} from '../../hooks/UseMercadopago'

const MercadopagoDescription = ({open, order, setOpen, setOrder}) => {
  const {data} = useGetMPOrder(order)

  console.log(order)

  return (
    <div>
      {data && (
        <Dialog open={open} maxWidth="lg">
          <DialogTitle>Detalle orden Mercadopago</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="inherit"
              onClick={() => {
                setOpen(false)
                setOrder(null)
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}

export default MercadopagoDescription
