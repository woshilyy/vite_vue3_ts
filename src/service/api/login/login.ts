//login.ts
import http from '@/service/http'
import * as T from './types'
class Service {
  loginApi: T.ILoginApi = {
    login(params) {
      return http.post('http://localhost:3000/user/login', params)
    },
  }
}

export default new Service()
