import {Component, signal, WritableSignal} from '@angular/core';
import {ProductsService} from '../../services/products-serves';
import {ProductDto} from '../../dtos/product.dto';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Loading} from '../../components/loading/loading';
import {Alert} from '../../components/alert/alert';
import {ImageSlider} from '../../components/image-slider/image-slider';
import {PageHeader} from '../../components/page-header/page-header';
import {PrintStar} from '../../components/print-star/print-star';
import {NgIcon} from '@ng-icons/core';
import {DatePipe} from '@angular/common';
import Swal from 'sweetalert2';
import {toast} from '../../utilities/swal-toast-utility';
import {CommentList} from '../../components/comment-list/comment-list';

@Component({
  selector: 'app-product-details-page',
  imports: [
    Loading,
    Alert,
    ImageSlider,
    PageHeader,
    PrintStar,
    NgIcon,
    DatePipe,
    RouterLink,
    CommentList,
  ],
  templateUrl: './product-details-page.html',
  styleUrl: './product-details-page.css',
})
export class ProductDetailsPage {
  product:ProductDto|undefined=undefined;
  loading:WritableSignal<boolean>=signal(true)
  error:WritableSignal<boolean>=signal(false)
  constructor(private productService: ProductsService,route: ActivatedRoute,private router:Router) {
    route.paramMap.subscribe(params => {
      const slug=params.get('slug')
      if (slug){
        productService.getProductBySlug(slug).subscribe({
          next: product => {
            this.product = product;
            console.log(this.product);
            this.loading.set(false)},

          error: error => {
            this.error.set(true);
            this.loading.set(false);
          }
        })
      }
    })
  }


   deleteHandler(){
    Swal.fire({
      title: 'توجه',
      text:'از حذف این محصول مطمعن هستید؟',
      cancelButtonText:'لغو',
      showCancelButton: true,
      confirmButtonText:'بله',
      icon: 'warning',
    }).then(result => {
      if (result.isConfirmed && this.product) {
        this.productService.deleteProduct(this.product._id).subscribe({
          next: product => {
            toast.fire({
              text:'محصول حذف شد',
              icon:'success',
            })
            this.router.navigate(['/products']);
          },
          error: error => {
            toast.fire({
              text:'خطا در حذف محصول ',
              icon:'error',
            })
          }
        })
      }
    })
  }

}
