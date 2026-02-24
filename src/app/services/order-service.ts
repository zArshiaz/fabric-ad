import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChangeOrderFormDto, OrderDto, OrdersDto} from '../dtos/order.dto';
import {Observable} from 'rxjs';
import {ApiAddressesUtility} from '../utilities/api-addresses.utility';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders=signal<OrdersDto>([]);
  http=inject(HttpClient);



  getAllOrders():Observable<OrdersDto> {
    return this.http.get<OrdersDto>(ApiAddressesUtility.getALlOrders)
  }
  changProcessStatus(id:string,status:Pick<OrderDto,'processStatus'>):Observable<OrderDto> {
    return this.http.post<OrderDto>(ApiAddressesUtility.changeProcessStatus+id,status);
  }
  deleteOrderById(id:string):Observable<OrderDto> {
    return this.http.delete<OrderDto>(ApiAddressesUtility.deleteOrder+id)
  }
  getOrder(id:string):Observable<OrderDto> {
    return this.http.get<OrderDto>(ApiAddressesUtility.getOrder+id)
  }
  changeAddress(id:string,newAddress:ChangeOrderFormDto):Observable<OrderDto> {
    return this.http.post<OrderDto>(ApiAddressesUtility.changeAddress+id,newAddress);
  }
}
