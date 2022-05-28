import {
  CHANGE_PAGE
} from '../constants/actionTypes/common'

const INITIAL_STATE = {
  page: 'home',
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page
      }
    default:
      return state
  }
}

export default reducer