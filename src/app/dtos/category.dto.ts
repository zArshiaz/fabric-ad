export type GetAllCategoryDto = CategoryDto[]

export interface CategoryDto {
  _id: string
  name: string
  slug: string
  status: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface CategoryForm {
name: string
  slug: string
  description?: string
}
