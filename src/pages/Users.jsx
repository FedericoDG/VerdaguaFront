/* eslint-disable camelcase */
import {Navigate} from 'react-router-dom'
import {Typography} from '@mui/material'
import {useContext, useState} from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import useGetUsers, {useDeleteUser, usePostUser, usePutUser} from '../hooks/useUsers'
import appContext from '../context/AppContext'
import Dashboard from '../components/Dashboard'
import Spinner from '../components/Spinner'
import useGetRoles from '../hooks/useRoles'
import UsersForm from '../components/users/UsersForm'
import UsersTable from '../components/users/UsersTable'

const Users = () => {
  const {
    user: {id_rol},
  } = useContext(appContext)

  if (id_rol > 1) return <Navigate replace to="/dashboard/passengers" />

  const [initialValues, setInitialValues] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    id_rol: '',
  })

  const {data: users, isError: isErrorUsers, error: errorUsers} = useGetUsers()
  const {mutate: postUser, isLoading: isLoadingPost} = usePostUser()
  const {mutate: putUser, isLoading: isLoadingPut} = usePutUser()
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
              isLoading={isLoadingPost || isLoadingPut}
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
