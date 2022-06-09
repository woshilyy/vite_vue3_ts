//login.ts
import http from '@/service/http'
import * as T from './types'

class Service {
  getPosts: T.IGetPosts = {
    getPostList(params) {
      return http.get('http://localhost:3000/article/list', params)
    },
  }
  addPosts: T.IAddPosts = {
    addPost(params) {
      return http.post('http://localhost:3000/article', params)
    },
  }
  editPosts: T.IEditPosts = {
    editPost(params) {
      return http.post('http://localhost:3000/article/edit', params)
    },
  }
  deletePosts: T.IDelPosts = {
    delPost(params) {
      return http.post(`http://localhost:3000/article/delete`, params)
    },
  }
  getTagList: T.IGetTags = {
    getTagList() {
      return http.get('http://localhost:3000/tag/list')
    },
  }
}

export default new Service()
