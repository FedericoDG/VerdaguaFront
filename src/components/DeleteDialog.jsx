import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const DeleteDialog = ({
  body = 'Tenga en cuenta que esta operación es irreversible.',
  button = 'Eliminar',
  handleAction,
  handleClose,
  id,
  open,
  title = '¿Confirma que quiere eliminar el registro?',
}) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{body}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="inherit" onClick={handleClose}>
        Salir
      </Button>
      <Button
        autoFocus
        color="error"
        onClick={() => {
          handleAction(id)
          handleClose()
        }}
      >
        {button}
      </Button>
    </DialogActions>
  </Dialog>
)

export default DeleteDialog
