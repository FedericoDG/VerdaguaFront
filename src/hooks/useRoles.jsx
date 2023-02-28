import {useQuery} from 'react-query'

import {getRequest} from '../services/httpRequest'

const fetchRoles = () => getRequest('/roles/')

// FETCH
const useGetRoles = (onSuccess, onError) =>
  useQuery(['roles'], fetchRoles, {
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export default useGetRoles
