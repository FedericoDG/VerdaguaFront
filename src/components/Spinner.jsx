import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Spinner = ({height = 0}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: height,
    }}
  >
    <CircularProgress />
  </Box>
)

export default Spinner
