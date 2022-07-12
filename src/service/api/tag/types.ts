export interface IGetTagsParams {
  page: number
  size: number
}
export interface IAddTagsParams {
  title: string
  content?: string
  author?: string
  type: number
}

export interface IEditTagsParams extends IAddTagsParams {
  id: number
}
export interface IGetTags {
  getTagList: (params: IGetTagsParams) => Promise<any>
}
export interface IAddTags {
  addTag: (params: IAddTagsParams) => Promise<any>
}

export interface IEditTags {
  editTag: (params: IEditTagsParams) => Promise<any>
}

export interface IDelTags {
  delTag: (params: { id: number }) => Promise<any>
}
