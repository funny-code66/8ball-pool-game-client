import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  CREATE_CHARACTER,
  DROP_CHARACTER
} from '../constants/actionTypes/auth'

const INITIAL_STATE = {
  currentUser: {
    id: 0,
    username: '',
    email: '',
    token: '',
    role: ''
  },

  characterData: {
    background: -1,
    gendor: -1,
    hair: -1,
    face: -1,
    eye: -1,
    clothes: -1,
    shoes: -1,
    skin: -1
  }
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        currentUser: {
          id: action.user.data.id,
          firstname: action.user.data.firstname,
          lastname: action.user.data.lastname,
          email: action.user.data.email,
          role: action.user.data.role,
          token: action.user.token,
        }
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        currentUser: {
          email: '',
          token: '',
          role: ''
        },
        characterData: {
          background: -1,
          gendor: -1,
          hair: -1,
          face: -1,
          eye: -1,
          clothes: -1,
          shoes: -1,
          skin: -1
        }
      }
    case CREATE_CHARACTER:
      console.log("create character data=", action.model.data)
      return {
        ...state,
        characterData: {
          background: action.model.data.background,
          gendor: action.model.data.gendor,
          hair: action.model.data.hair,
          face: action.model.data.face,
          eye: action.model.data.eye,
          clothes: action.model.data.clothes,
          shoes: action.model.data.shoes,
          skin: action.model.data.skin
        }
      }
    case DROP_CHARACTER:
      return {
        ...state,
        characterData: {
          background: -1,
          gendor: -1,
          hair: -1,
          face: -1,
          eye: -1,
          clothes: -1,
          shoes: -1,
          skin: -1
        }
      }
    default:
      return state
  }
}

export default reducer