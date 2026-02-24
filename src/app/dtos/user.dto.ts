import {AnswerDto, User} from './comment.dto';

export type GetUsersResponse = UserDto[]


export interface UserDto {
  _id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  __v: number
  phone: string
  role: string
}
export interface UserForm{
  email: string,
  name: string,
  phone: string,
  role: string,
}

export interface UserCommentsDto {
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
  likes:string[]
}
