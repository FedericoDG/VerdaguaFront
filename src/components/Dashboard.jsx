import {Box, Container, Grid, Toolbar} from '@mui/material'
import {useContext} from 'react'

import appContext from '../context/AppContext'

import Aside from './aside/Aside'
import Copyright from './footer/Copyright'
import Navbar from './Navbar'

const Dashboard = ({children}) => {
  const {open, toggleDrawer, top} = useContext(appContext)

  return (
    <Box sx={{display: 'flex'}}>
      <Navbar open={open} toggleDrawer={toggleDrawer} />
      <Aside open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
          <Grid container spacing={3}>
            <span ref={top} id="top" style={{color: 'transparent'}} />
            {children}
          </Grid>
          <Copyright />
        </Container>
      </Box>
    </Box>
  )
}

export default Dashboard
