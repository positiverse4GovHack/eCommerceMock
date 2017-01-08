/**
 * Author: Bartłomiej Klinger <bartlomiej.klinger@positiverse.com>
 */

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registerFormUpdate: ['update'],
  registerConsentsRequest: null,
  registerConsentsRequestUnsupported: null,
  registerConsentsRequested: null,
  registerConsentsSuccess: ['notification'],
  registerFailure: ['error'],
})

export const RegisterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  firstName: null,
  lastName: null,
  birthDate: null,
  email: null,
  mobilePhone: null,
  address: null,
  postalCode: null,
  city: null,
  country: null,
  requesting: false,
  unsupported: false,
  error: null,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const formUpdate = (state, action) => {
  const { update } = action
  return state.merge({ unsupported: false, requesting: false, ...update,  error: null })
}

// request the data from an api
export const consentsRequest = state =>
  state.merge({ unsupported: false, requesting: false,  error: null })

// request the data from an api
export const consentsRequested = state =>
  state.merge({ unsupported: false, requesting: true,  error: null })

// request the data from an api
export const consentsRequestUnsupported = state =>
  state.merge({ unsupported: true, requesting: false,  error: true })

// successful api lookup
export const consentsSuccess = (state, action) => {
  const { notification } = action
  return state.merge({ unsupported: false, requesting: false, ...notification, error: null })
}

// Something went wrong somewhere.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({ unsupported: false, requesting: false, error: error })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_FORM_UPDATE]: formUpdate,
  [Types.REGISTER_CONSENTS_REQUEST]: consentsRequest,
  [Types.REGISTER_CONSENTS_REQUEST_UNSUPPORTED]: consentsRequestUnsupported,
  [Types.REGISTER_CONSENTS_REQUESTED]: consentsRequested,
  [Types.REGISTER_CONSENTS_SUCCESS]: consentsSuccess,
  [Types.REGISTER_FAILURE]: failure
})
