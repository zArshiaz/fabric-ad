import {Component, input, model} from '@angular/core';
import {OrderDto, OrdersDto} from '../../dtos/order.dto';
import {OrdersItem} from '../orders-item/orders-item';
import {Alert} from '../alert/alert';

@Component({
  selector: 'app-orders-list',
  imports: [
    OrdersItem,
    Alert
  ],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.css',
})
export class OrdersList {
  ordersList = model.required<OrdersDto>()
  ordersListFiltered = input.required<OrdersDto>()

  updateOrderList = (newData: OrderDto, action: "edit" | "delete" = "edit") => {
    this.ordersList.update(prev => {
      let index = prev.findIndex(item => item._id === newData._id)
      if (index === -1) return prev;
      if (action == 'edit') {
        return [...prev.slice(0, index), newData, ...prev.slice(index + 1)];
      }
      if (action == 'delete') {
        return prev.filter(item => item._id !== newData._id);
      }
      return prev;
    })


  }


}
