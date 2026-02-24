import {Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {ProductDto} from '../../dtos/product.dto';
import {TomanPipe} from '../../pipes/toman-pipe';
import {ProductsService} from '../../services/products-serves';
import Swal from 'sweetalert2';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-product-item',
  imports: [
    TomanPipe,
    RouterLink,
  ],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  constructor(private productService: ProductsService) {
  }

  @Input()
  product!: ProductDto;

  @Output()
  deleteProductEmit: EventEmitter<string> = new EventEmitter();

  async deleteHandler() {
    const res = await Swal.fire({
      title: `از حذف  محصول  با نام (${this.product.name}) مطمعن هستید؟`,
      showCancelButton: true,
      cancelButtonText: 'خیر',
      confirmButtonText: 'بله',
      icon: 'info',
    })
    if (res.isConfirmed) {
      this.productService.deleteProduct(this.product._id).subscribe({
        next: res => {
          Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
            icon: 'success',
            text: 'محصول حذف شد',
          })
          this.deleteProductEmit.emit(this.product._id);

        },
        error: err => {
          Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
            icon: 'error',
            text: 'خطا در حذف',
          });
        }
      })
    }


  }

}
