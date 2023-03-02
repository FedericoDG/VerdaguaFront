import {Typography} from '@mui/material'
import {useState} from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import useGetUsers, {useDeleteUser, usePostUser, usePutUser} from '../hooks/useUsers'
import Dashboard from '../components/Dashboard'
import useGetRoles from '../hooks/useRoles'
import UsersForm from '../components/users/UsersForm'
import UsersTable from '../components/users/UsersTable'
import Spinner from '../components/Spinner'

const Users = () => {
  const [initialValues, setInitialValues] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    id_rol: '',
  })

  const {data: users, isError: isErrorUsers, error: errorUsers} = useGetUsers()
  const {mutate: postUser} = usePostUser()
  const {mutate: putUser} = usePutUser()
  const {mutate: deleteUser} = useDeleteUser()
  const {data: roles, isError: isErroRoles, error: errorRoles} = useGetRoles()

  if (isErrorUsers) return <h2>Error: {errorUsers.message}</h2>
  if (isErroRoles) return <h2>Error: {errorRoles.message}</h2>

  return (
    <Dashboard>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography sx={{marginBottom: 1}} variant="h6">
            Usuario
          </Typography>

          {!roles ? (
            <Spinner height={251} />
          ) : (
            <UsersForm
              initialValues={initialValues}
              postUser={postUser}
              putUser={putUser}
              roles={roles}
              setInitialValues={setInitialValues}
            />
          )}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6">Lista de Usuarios</Typography>
          {!users ? (
            <Spinner height={565} />
          ) : (
            <UsersTable data={users} deleteUser={deleteUser} setInitialValues={setInitialValues} />
          )}
        </Paper>
      </Grid>
    </Dashboard>
  )
}

export default Users
