import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import Dashboard from '../components/Dashboard'

const Home = () => (
  <Dashboard>
    <Grid item xs={12}>
      <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
        <p>ACA PUEDE IR ALGO</p>
      </Paper>
    </Grid>
    <Grid item lg={9} md={8} xs={12}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
        }}
      >
        <p>ACA PUEDE IR ALGO</p>
      </Paper>
    </Grid>
    <Grid item lg={3} md={4} xs={12}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
        }}
      >
        <p>ACA PUEDE IR ALGO</p>
      </Paper>
    </Grid>
  </Dashboard>
)

export default Home
