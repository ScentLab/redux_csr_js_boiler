import {
  SubmissionError
} from 'redux-form'
import {
  createAction,
  handleActions
} from 'redux-actions'
import {
  request
} from './apiRoute'

const initialState = {
  isIdOverlap: false,
  isAuthenticated: false,
}
export const VALIDATE_EMAIL = createAction('auth/isValid/email')
export const VALIDATE_USERNAME = createAction('auth/isValid/username')
export const SIGN_UP = createAction('auth/sign_up')
export const SIGN_IN = createAction('auth/sign_in')
export const SIGN_OUT = createAction('auth/sign_out')
export const REFRESH = createAction('auth/refresh')

export default handleActions({
  [VALIDATE_USERNAME]: (state, {
    payload
  }) => ({
    ...state,
    ...payload
  }),
  [VALIDATE_EMAIL]: (state, {
    payload
  }) => ({
    ...state,
    ...payload
  }),
  [SIGN_IN]: (state, {
    payload
  }) => ({
    ...state,
    ...payload
  }),
}, initialState);

export const validateEmail = async (values) => {
  try {
    await request({
      path: '/auth/isValid/email',
      method: 'post',
      data: values
    })
    return VALIDATE_EMAIL({
      isValidEmail: true
    })
  } catch (err) {
    VALIDATE_EMAIL({
      isValidUsername: false
    })
    throw new SubmissionError({
      message: '유효하지 않은 이메일입니다.',
      _error: 'not_valid_email'
    })
  }
}

export const validateUsername = async (values) => {
  try {
    await request({
      path: '/auth/isValid/username',
      method: 'post',
      data: values
    })
    return VALIDATE_USERNAME({
      isValidUsername: true
    })
  } catch (err) {
    VALIDATE_USERNAME({
      isValidUsername: false
    })
    throw new SubmissionError({
      message: '유효하지 않은 사용자 이름입니다.',
      _error: 'not_valid_username'
    })
  }
}

export const signUp = async (values) => {
  try {
    await request({
      path: '/auth/join',
      method: 'post',
      data: values
    })
  } catch (e) {
    throw e
  }
}

export const signIn = async (values) => {
  try {
    const {
      result: {
        token,
      }
    } = await request({
      path: '/auth/login',
      method: 'post',
      data: values
    })
    window.localStorage.setItem('accessToken', token)
    return SIGN_IN({
      isAuthenticated: true,
    })
  } catch (e) {
    throw e
  }
}

export const signOut = () => {
  // try {
  //   return SIGN_OUT()
  // } catch (e) {
  //   throw e
  // }
}
