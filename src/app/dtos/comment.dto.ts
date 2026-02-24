export interface CommentDto {
  _id: string
  user: User
  product: {
    _id: string
    name: string
  }
  text: string
  stars: number
  answer: AnswerDto[]
  createdAt: string
  updatedAt: string
  __v: number
  status: string
  likesCount: number
  likedByCurrentUser:boolean;
  hasDraftAnswer:boolean
}
export interface User {
  _id: string
  name: string
  role: string
  email: string
}
export interface AnswerDto {
  user: User
  text: string
  _id: string
  status: 'active' | 'draft'
  createdAt: string
  updatedAt: string
}
export interface EditCommentForm {
status: string
  text: string
  stars: number
}


