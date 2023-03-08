import {CssBaseline, ThemeProvider} from '@mui/material'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {SnackbarProvider} from 'notistack'

import AppProvider from './context/AppProvider'
import AppRouter from './router/AppRouter'
import light from './themes/light'

const queryClient = new QueryClient()

const App = () => (
  <AppProvider>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={light}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </SnackbarProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </AppProvider>
)

export default App
