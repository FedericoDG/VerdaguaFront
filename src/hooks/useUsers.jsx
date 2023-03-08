import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useSnackbar} from 'notistack'

import {deleteRequest, getRequest, postRequest, putRequest} from '../services/httpRequest'

const getUsers = () => getRequest('/users/')
const createUser = (user) => postRequest('/users/', user)
const editUser = (user) => putRequest(`/users/${user.id}`, user)
const deleteUser = (id) => deleteRequest(`/users/${id}`)

// GET USERS
const useGetUsers = () =>
  useQuery(['users'], getUsers, {
    select: (data) => data.data.map((el) => ({...el, rolename: el.rol.name})),
  })

// MUTATION POST
export const usePostUser = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(createUser, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('users')
      enqueueSnackbar(res.msg, {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      })
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.msg, {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      })
    },
  })
}

// MUTATION PUT
export const usePutUser = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(editUser, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('users')
      enqueueSnackbar(res.msg, {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      })
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.msg, {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      })
    },
  })
}

// MUTACION DELETE
export const useDeleteUser = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(deleteUser, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('users')
      enqueueSnackbar(res.msg, {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      })
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.msg, {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      })
    },
  })
}

export default useGetUsers
