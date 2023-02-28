import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const DialogForValidContracts = ({open, handleClose, validContracts}) => (
  <Dialog
    aria-describedby="alert-dialog-description"
    aria-labelledby="alert-dialog-title"
    open={open}
    onClose={handleClose}
  >
    <DialogTitle>Use Googles location service</DialogTitle>
    <DialogContent>
      <DialogContentText>{validContracts}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Disagree</Button>
      <Button autoFocus onClick={handleClose}>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
)

export default DialogForValidContracts
