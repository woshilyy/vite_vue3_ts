export interface IGetPostsParams {
  page: number
  size: number
}
export interface IAddPostsParams {
  title: string
  content?: string
  author?: string
  type: number
}

export interface IEditPostsParams extends IAddPostsParams {
  id: number
}
export interface IGetPosts {
  getPostList: (params: IGetPostsParams) => Promise<any>
}
export interface IAddPosts {
  addPost: (params: IAddPostsParams) => Promise<any>
}

export interface IEditPosts {
  editPost: (params: IEditPostsParams) => Promise<any>
}

export interface IDelPosts {
  delPost: (params: { id: number }) => Promise<any>
}
export interface IGetTags {
  getTagList: () => Promise<any>
}
