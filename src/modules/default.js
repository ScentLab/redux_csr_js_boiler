import axios from 'axios'

const successHandler = (response) => {
    try {
      console.log('[Response Data]: ')
      console.log(response.status, response.data)
      return {status: response.status, result: response.data}
    } catch (error) {
      console.log(`[ParseError]: ${  error}`)
      console.log(response.data)
      return response.data
    }
}
  
  const errorHandler = (err) => {
      const {status, data} = err.response
    try {
      console.log(`[Error]: ${JSON.stringify(data, null, 2)}`)
      console.error(status, data)
      return {status, data}
    }
    catch (error) {
      console.log(`[ParseError]: ${error}`)
      return {status: 400, errorMessage: error}
    }
}
  
export default class ApiRoute {
  constructor(object) {
    this.url = object.url || null
    this.path = object.path || ''
    this.method = object.method || 'get'
    this.params = object.params || {}
    this.data = object.data || {}
    this.model = object.model
    this.headers = object.headers || {}
  }

  asURLRequest() {
    const {CancelToken} = axios
    const options = {
      method: this.method,
      url: this.url ? this.url : `${process.env.REACT_APP_URL}${this.path}`,
      params: this.params,
      data: this.data,
      timeout: 20000,
      headers: this.headers,
      cancel: new CancelToken((c) => {
        this.cancel = c
      })
    }
    console.log(options)
    console.log(`[Request]: ${  JSON.stringify(this, null, 2)}`)
    return axios(options)
  }

  async request(dispatch, getState) {
    console.log('-----------------------------------------------------')
    try {
      const response = await this.asURLRequest(getState)
      return successHandler(response)
    }
    catch (error) {
      throw errorHandler(error)
    }
  }
}