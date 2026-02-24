import {Component, input, model, OnInit, signal} from '@angular/core';
import {ProductsService} from '../../services/products-serves';
import {ProductItem} from '../product-item/product-item';
import {ProductDto} from '../../dtos/product.dto';
import {NgIcon} from '@ng-icons/core';
import {Alert} from '../alert/alert';
import {Loading} from '../loading/loading';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductItem,
    Alert
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList  {
  loading: boolean = true;
  products=model.required<ProductDto[]>()
  filteredProducts=input.required<ProductDto[]>()


  theProductsDeleted(e:string){
    this.products.update(prev=> prev.filter(p=>p._id!==e))
  }



}
