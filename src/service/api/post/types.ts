export interface IGetPostsParams {
  page: number
  pageSize: number
}
export interface IAddPostsParams {
  title: string
  content?: string
  author?: string
  type: number
}
export interface IGetPosts {
  getPostList: (params: IGetPostsParams) => Promise<any>
}
export interface IAddPosts {
  addPost: (params: IAddPostsParams) => Promise<any>
}

export interface IDelPosts {
  delPost: (id: number) => Promise<any>
}
export interface IGetTags {
  getTagList: () => Promise<any>
}
