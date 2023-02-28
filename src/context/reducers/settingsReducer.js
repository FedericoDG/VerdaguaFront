const settingsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SETTINGS':
      return {
        ...action.payload,
      }
    case 'REMOVE_SETTINGS':
      return {}
    default:
      return state
  }
}

export default settingsReducer
