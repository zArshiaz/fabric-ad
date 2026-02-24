import {UserDto} from './user.dto';

export type OrdersDto=OrderDto[];

export interface OrderDto {
  _id:           string;
  orderNumber: string;
  user:          UserDto;
  items:         ItemOrderDto[];
  address:       AddressOrderDto;
  addressCost:   number;
  productsCost:  number;
  totalPrice:    number;
  status:        string;
  processStatus:  "confirmed" | "shipped" | "delivered" | "canceled";
  createdAt:     Date;
  updatedAt:     Date;
  __v:           number;
}

export interface AddressOrderDto {
  title:     string;
  userId:    string;
  province:  string;
  city:      string;
  zipCode:   number;
  address:   string;
  phone:     string;
  _id:       string;
  createdAt: Date;
  updatedAt: Date;
  __v:       number;
}

export interface ItemOrderDto {
  product:       string;
  name:          string;
  price:         number;
  count:         number;
  image:         string;
  discountPrice: number;
}

export type ChangeOrderFormDto=Omit<AddressOrderDto,'_id'|'__v'|'createdAt'|'updatedAt'|'userId'>
