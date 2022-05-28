import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  CREATE_CHARACTER,
  DROP_CHARACTER
} from '../constants/actionTypes/auth'

export const login = user => ({ type: AUTH_LOGIN, user })

export const logout = () => ({ type: AUTH_LOGOUT })

export const createCharacter = model => ({ type: CREATE_CHARACTER, model })

export const dropCharacter = () => ({ type: DROP_CHARACTER })