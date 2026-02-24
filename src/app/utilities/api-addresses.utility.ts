export class ApiAddressesUtility {
  static baseAddress: string = 'http://localhost:4000/api';
  static login: string = '/auth/adLogin'
  static logout: string = '/auth/logout'
  static getMe: string = '/auth/me'

  static getProducts: string = '/product/all'
  static getProduct: string = '/product/' //:slug
  static addProducts: string = '/product/add';
  static deleteProduct: string = '/product/delete/'; //:id
  static editProduct: string = '/product/edit/'; //:id

  static getCategories: string = '/category/all'
  static addCategories: string = '/category'
  static deleteCategory: string = '/category/' //:id delete method
  static editCategory: string = '/category/' //:id

  static getAllUsers:string='/user/all'
  static getUser:string='/user/' //:id
  static getUserComments:string='/user/comments/' //:userId
  static editUser:string='/user/edit/' //:userId

  static addImage: string = '/upload/images';
  static categories: string = '/category/all';

  static getALlOrders:string = '/order/all';
  static changeProcessStatus:string = '/order/changeProcessStatus/'; // :id
  static deleteOrder:string = '/order/'; // :id
  static getOrder:string = '/order/';  //:id
  static changeAddress:string = '/order/changeAddress/';  //:id

  static getNavbarItemsAndAddItem:string = '/navbar';
  static editAndDeleteNavbarItem:string = '/navbar/';  //:id
}
