import {Component, computed, inject, input, model, OnInit, output, signal} from '@angular/core';
import {OrderDto} from '../../dtos/order.dto';
import {JalaliDatePipe} from '../../pipes/jalali-date-pipe';
import {FormsModule} from '@angular/forms';
import { OrderService } from '../../services/order-service';
import {toast} from '../../utilities/swal-toast-utility';

@Component({
  selector: 'app-order-details',
  imports: [
    JalaliDatePipe,
    FormsModule
  ],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit {
orderService=inject(OrderService);
  order = input.required<OrderDto>()
  orderChanged=output<void>()

  isShowInput = signal(false)
  processStatus:"confirmed" | "shipped" | "delivered" | "canceled"='confirmed'

  ngOnInit() {
    this.processStatus = this.order().processStatus
  }


  showInput() {
    this.isShowInput.set(true);
  }

  closeInput() {
    this.isShowInput.set(false);
    this.processStatus=this.order().processStatus;
  }

  changeProcessStatus() {
    if (this.processStatus !=this.order().processStatus) {
      this.orderService.changProcessStatus(this.order()._id, {processStatus:this.processStatus})
        .subscribe({
          next: result => {
            toast.fire({
              icon: 'success',
              text:'وصغیت سفارش تغییر یافت.'
            })
            this.orderChanged.emit()
            this.closeInput();
          },
          error: err => {
            toast.fire({
              icon: 'error',
              text:'خظا در تفییر وضعیت.'
            })
          }
        })
    }
  }

  processStatusText = computed(() => {
    switch (this.order().processStatus) {
      case 'confirmed':
        return 'درحال پردازش';
      case 'shipped':
        return "پست شده";
      case "delivered":
        return "تحویل داده شده به مشتری"
      case 'canceled':
        return "لغو شده"

    }
  })
}
