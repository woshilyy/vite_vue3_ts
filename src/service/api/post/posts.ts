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
  deletePosts: T.IDelPosts = {
    delPost(id: number) {
      return http.post(`http://localhost:3000/api/posts/delete/${id}`)
    },
  }
  getTagList: T.IGetTags = {
    getTagList() {
      return http.get('http://localhost:3000/tag/list')
    },
  }
}

export default new Service()
