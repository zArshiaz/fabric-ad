import {Component, computed, inject, input, model} from '@angular/core';
import {OrderDto} from '../../dtos/order.dto';
import {JalaliDatePipe} from '../../pipes/jalali-date-pipe';
import {NgIcon} from '@ng-icons/core';
import {NgClass} from '@angular/common';
import {OrderService} from '../../services/order-service';
import {toast} from '../../utilities/swal-toast-utility';
import Swal from 'sweetalert2';
import {RouterLink} from '@angular/router';
type NextStatus = { text: string; changeStatus: "shipped" | "delivered" ,style:string};

@Component({
  selector: 'app-orders-item',
  imports: [
    JalaliDatePipe,
    NgIcon,
    NgClass,
    RouterLink
  ],
  templateUrl: './orders-item.html',
  styleUrl: './orders-item.css',
})
export class OrdersItem {
  orderService=inject(OrderService);
  order=input.required<OrderDto>()

  updateOrder=input.required<(newData:OrderDto,action?:'edit'|'delete')=>void>()
  statusBag=computed(()=>{
      switch (this.order().processStatus){
        case "confirmed":
          return {
            text:'درحال پردازش',
            class:'bg-orange-50 border-orange-500 text-orange-500'
          }
        case "shipped":
          return {
            text:'پست شده',
            class:'bg-purple-50 border-purple-700 text-purple-700'
          }
        case "delivered":
          return {
            text: "تحویل داده شده",
            class: "bg-green-50 border-green-700 text-green-700"
          }
        case "canceled":
          return {
            text: "لغو شده",
            class:"bg-red-50 border-red-600 text-red-600"
        }

      }
  })
  changeStatusBtn = computed<NextStatus | undefined>(() => {
    const s = this.order().processStatus;
    if (s === "confirmed") return { text: "تحویل به پست", changeStatus: "shipped" ,style:' bg-purple-700' };
    if (s === "shipped")   return { text: "تحویل داده شده", changeStatus: "delivered" ,style:' bg-green-700 '};
    return undefined;
  });


 deleteOrderHandler(){
  Swal.fire({
    icon:'question',
    text:'از حذف سفارش با آیدی '+this.order().orderNumber+" مربوط به کاربر با نام "+this.order().user.name+' مطعن هستید؟',
    showCancelButton: true,
    cancelButtonText:'خیر',
    confirmButtonText:'بله'
  }).then((result) => {
    if (result.isConfirmed) {
      this.orderService.deleteOrderById(this.order()._id)
        .subscribe({
          next: (res)=>{
            toast.fire({
              icon:'success',
              text:'سفازش با موفقیت حذف شد.'
            });
            this.updateOrder()(res,"delete")
          },
          error: (err)=>{
            toast.fire({
              icon:'error',
              text:'خطا در حذف سفارش',
            })
          }
        })
    }
  })
}

  changeStatus=(status: "confirmed"| "shipped"| "delivered"| "canceled")=>{
    this.orderService.changProcessStatus(this.order()._id,{processStatus:status})
      .subscribe({
        next:(newData)=>{
          toast.fire({
            icon:'success',
            text:'سفارش با موفقیت تغییر یافت'
          })
          this.updateOrder()(newData)
        },
        error:(e)=>{
          toast.fire({
            icon:'error',
            text:e.message,
          })
        }
      })
}
}
