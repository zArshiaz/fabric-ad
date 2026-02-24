import {Component, inject, signal, effect} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderDto} from '../../dtos/order.dto';
import {OrderService} from '../../services/order-service';
import {toast} from '../../utilities/swal-toast-utility';
import {PageHeader} from '../../components/page-header/page-header';
import {Loading} from '../../components/loading/loading';
import {Alert} from '../../components/alert/alert';
import {CustomerDetails} from '../../components/customer-details/customer-details';
import {OrderAddress} from '../../components/order-address/order-address';
import {OrderDetails} from '../../components/order-details/order-details';

@Component({
  selector: 'app-order-details-page',
  imports: [
    PageHeader,
    Loading,
    Alert,
    CustomerDetails,
    OrderAddress,
    OrderDetails
  ],
  templateUrl: './order-details-page.html',
  styleUrl: './order-details-page.css',
})
export class OrderDetailsPage {
  route = inject(ActivatedRoute);
  orderService = inject(OrderService);

  id = signal('');
  orderDetails = signal<OrderDto | null>(null);
  loading = signal(true);
  error = signal(false);

  constructor() {
    this.route.params.subscribe(params => {
      this.id.set(params['id']);
    });

    effect(() => {
      const id = this.id();
      if (id) {
        this.getData(id);
      }
    });
  }


  getData(id: string) {
    this.orderService.getOrder(id).subscribe({
      next: result => {
        this.orderDetails.set(result);
        this.error.set(false);
      },
      error: () => {
        this.error.set(true);
        toast.fire({
          icon: 'error',
          text: "خطا در گرفتن اطلاعات"
        });
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }
}
