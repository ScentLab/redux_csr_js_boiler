import axios from 'axios'

const successHandler = ({
  status,
  data
}) => {
  try {
    console.log('[Response Data]: ')
    console.log(`status / values: ${ status} / ${JSON.stringify(data, null, 2)}`)
    return {
      status,
      result: data
    }
  } catch (err) {
    console.log(`[ParseError]: ${ err}`)
    console.log(data)
    return data
  }
}

const errorHandler = ({
  response
}) => {
  try {
    console.log(`[Error]: ${JSON.stringify(response.data, null, 2)}`)
    console.error(response.status, response.data)
    return response
  } catch (err) {
    console.log(`[ParseError]: ${err}`)
    return {
      status: 500,
      errorMessage: 'destroied server'
    }
  }
}

const asURLRequest = options => {
  console.log(`[Request]: ${  JSON.stringify(options, null, 2)}`)
  return axios(options)
}

export const request = async options => {
  console.log('-----------------------------------------------------')
  try {
    const response = await asURLRequest({
      ...options,
      timeout: 20000,
      url: options.url || `${process.env.REACT_APP_URL}${options.path}`,
    })
    return successHandler(response)
  } catch (err) {
    throw errorHandler(err)
  }
}
