export type NavbarList = NavbarItem[]

export interface NavbarItem {
  _id: string
  title: string
  href: string
  order: number
  dropdownItems: DropdownItem[]
  __v: number
}

export interface DropdownItem {
  title: string
  href: string
  _id: string
}

export interface NavbarForm {
  title: string,
  href: string,
  order: number ,
  dropdownItems: DropdownForm[]
}

export interface DropdownForm {
  title: string,
  href: string,
}
