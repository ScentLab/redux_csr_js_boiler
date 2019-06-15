import {SubmissionError} from 'redux-form'

import ApiRoute from './default'

export const CHECK_EMAIL_DUPLICATION = 'auth/check_email_duplication'
export const DUPLICATION_EMAIL = 'auth/duplication_email'
export const SIGN_UP_SUCCESS = 'auth/sign_up_success'
export const SIGN_IN_SUCCESS = 'auth/sign_in_success'
export const SIGN_OUT_SUCCESS = 'auth/sign_out_success'
export const REFRESH = 'auth/refresh'

export const checkEmailDuplication = (values) => {
  return async(dispatch, state) => {
    try{
      await new ApiRoute({
        path : '/auth/email',
        method : 'get',
        params : values
      }).request(dispatch, state)
      dispatch({type : CHECK_EMAIL_DUPLICATION, payload : 'nice email'})
    }catch(err){
      throw new SubmissionError({message : '중복된 이메일 입니다.', _error : 'check_email_failed'})
    }
  }
}

export const duplicationEmail = () => ({
  type : DUPLICATION_EMAIL
})

export const postAuthRegister = (values) => {
  return async (dispatch, state) => {
    try {
      const {result} = await new ApiRoute({
        path: '/auth/register',
        method: 'post',
        data: values
      }).request(dispatch, state)
      const { user } = result
      dispatch({type: SIGN_UP_SUCCESS, payload: user})
    } catch (e) {
      throw new SubmissionError({message : '회원가입 실패', _error: 'sign_up_failed'})
    }
  }
}

export const postAuth = (values) => {
  return async (dispatch, state) => {
    try {
      const {result} = await new ApiRoute({
        path: '/auth',
        method: 'post',
        data: values
      }).request(dispatch, state)
      const { accessToken, refreshToken, user } = result
      window.localStorage.setItem('accessToken', accessToken)
      window.localStorage.setItem('refreshToken', refreshToken)
      dispatch({type: SIGN_IN_SUCCESS, payload: user})
    } catch (e) {
      throw e
    }
  }
}

// change password
export const putAuth = (values) => {
  return async(dispatch, state) => {
    try{
      const { result } = await new ApiRoute({
        path : '/auth',
        method : 'put',
        data : values,
        headers : { authorization : `Bearer ${window.localStorage.getItem('accessToken')}`}
      }).request(dispatch, state)
      const { refreshToken } = result
      window.localStorage.removeItem('refreshToken')
      window.localStorage.setItem('refreshToken', refreshToken)
    }catch(err){
      throw err
    }
  }
}

// reset password
export const putAuthReset = (values) => {
  return async(dispatch, state) => {
    try{
        await new ApiRoute({
          path : '/auth/reset',
          method : 'put',
          data : values,
      }).request(dispatch, state)
    }catch(err){
      throw err
    }
  }
}

// refresh token
export const authRefresh = (values) => {
  return async(dispatch, state) =>{
    try{
      const { result } = await new ApiRoute({
        path : '/auth/refresh',
        method : 'post',
        data : values
      }).request(dispatch, state)
      const { accessToken } = result
      window.localStorage.removeItem('accessToken')
      window.localStorage.setItem('accessToken', accessToken)
      dispatch({type : REFRESH})
    }catch(err){
      throw err
    }
  }
}

const initialState = {
    isEmailDuplication : null,
    isAuthenticated : false,
    userInfo : {},
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case CHECK_EMAIL_DUPLICATION :
        return {...state, isEmailDuplication : false}
      case DUPLICATION_EMAIL :
        return {...state, isEmailDuplication : true}
      case SIGN_UP_SUCCESS :
        return { ...state, userInfo : {...action.payload}}
      case SIGN_IN_SUCCESS :
        return { ...state, isAuthenticated : true, userInfo : {...action.payload}}
        case SIGN_OUT_SUCCESS :
            return {...state, isAuthenticated: false}
      case REFRESH :
        return { ...state, isAuthenticated : true}
      default:
        return state
    }
  }
  