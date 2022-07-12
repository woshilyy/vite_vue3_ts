//login.ts
import http from '@/service/http'
import * as T from './types'

class Service {
  addTags: T.IAddTags = {
    addTag(params) {
      return http.post('http://localhost:3000/tag/create', params)
    },
  }
  editTags: T.IEditTags = {
    editTag(params) {
      return http.post('http://localhost:3000/tag/update', params)
    },
  }
  deleteTags: T.IDelTags = {
    delTag(params) {
      return http.post(`http://localhost:3000/tag/delete`, params)
    },
  }
  getTagList: T.IGetTags = {
    getTagList() {
      return http.get('http://localhost:3000/tag/list')
    },
  }
}

export default new Service()
