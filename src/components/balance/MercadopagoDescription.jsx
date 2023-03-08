import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material'

import {useGetMPOrder} from '../../hooks/UseMercadopago'

const MercadopagoDescription = ({open, order, setOpen, setOrder}) => {
  const {data} = useGetMPOrder(order)

  return (
    <div>
      {data && (
        <Dialog maxWidth="lg" open={open}>
          <DialogTitle>Detalle orden Mercadopago</DialogTitle>
          <DialogContent>
            <pre>{JSON.stringify(data, null, 2)}</pre>
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
