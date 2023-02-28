import {createTheme} from '@mui/material'

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#3700b3',
    },
    secondary: {
      main: '#0388fc',
    },
    error: {
      main: '#CF6679',
    },
    warning: {
      main: '#FFDD6B',
    },
    success: {
      main: '#66bb6a',
      contrastText: '#ffffff',
    },
    info: {
      main: '#03fcec',
    },
  },
}

const dark = createTheme(themeOptions)

export default dark
