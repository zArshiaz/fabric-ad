import {Component, computed, inject, signal, WritableSignal} from '@angular/core';
import {PageHeader} from '../../components/page-header/page-header';
import {Widget} from '../../components/widget/widget';
import {OrdersList} from '../../components/orders-list/orders-list';
import {OrderService} from '../../services/order-service';
import {OrdersDto} from '../../dtos/order.dto';
import {toast} from '../../utilities/swal-toast-utility';
import {Loading} from '../../components/loading/loading';
import {Alert} from '../../components/alert/alert';
import {Field, form} from '@angular/forms/signals';

@Component({
  selector: 'app-orders-page',
  imports: [
    PageHeader,
    Widget,
    OrdersList,
    Loading,
    Alert,
    Field
  ],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.css',
})
export class OrdersPage {
  orders: WritableSignal<OrdersDto>=signal<OrdersDto>([])
  ordersFiltered=computed(()=>{
    const text=this.filterForm.text().value().trim();
    const status=this.filterForm.status().value();
    const sort=this.filterForm.sort().value()||'new'
    return this.orders().filter(item=>{
      const matchText=!text||
        item.user.name.toLowerCase().includes(text.toLowerCase())||
        item.orderNumber.toLowerCase().includes(text.toLowerCase())||
        item.address.city.toLowerCase().includes(text.toLowerCase())||
        item.address.province.toLowerCase().includes(text.toLowerCase());

      const matchStatus=!status||
        item.processStatus===status;

      return (matchText&&matchStatus) ;
    }).sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();

      if (sort === 'new') {
        return bTime - aTime; // جدیدترین اول
      }
      if (sort === 'old') {
        return aTime - bTime; // قدیمی‌ترین اول
      }
      return 0;
    })
  })
  loading=signal(false);
  error=signal(false);
  filterSignal=signal({
    text:'',
    status:'',
    sort:'new'
  })
  filterForm=form(this.filterSignal)
  ordersLength=computed(()=>{
   return  this.orders().length
  })
  totalSale=computed(()=>{
    return  this.orders().reduce(
      (previousValue, currentValue) => previousValue + currentValue.totalPrice,
      0
    );
  })
  orderService=inject(OrderService);

  constructor() {
    this.loading.set(true);
    this.getData()
  }



  getData(){
    this.orderService.getAllOrders().subscribe({
      next: data => {
        this.orders.set(data);
      },
      error: err => {
        toast.fire({
          icon: 'error',
          text: err.message,
        })
      },
      complete: () => {
        this.loading.set(false);
      }
    })
  }
}
