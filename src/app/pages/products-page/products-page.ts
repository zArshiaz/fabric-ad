import {Component, computed, Signal, signal, WritableSignal} from '@angular/core';
import {PageHeader} from '../../components/page-header/page-header';
import {ProductList} from '../../components/product-list/product-list';
import {Field, form} from '@angular/forms/signals';
import {CategoryDto, ProductDto} from '../../dtos/product.dto';
import {ProductsService} from '../../services/products-serves';
import {CategoryService} from '../../services/category-service';
import {FormsModule} from '@angular/forms';
import {Loading} from '../../components/loading/loading';

@Component({
  selector: 'app-products-page',
  imports: [
    PageHeader,
    ProductList,
    Field,
    FormsModule,
    Loading,
  ],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {
  loading=signal(true)
  categories:WritableSignal<CategoryDto[]>=signal([])
  products: WritableSignal<ProductDto[]>=signal([])
  filteredProducts=computed(()=>{
    const text=this.filterForm.text().value().trim().toLowerCase();
    const status=this.filterForm.status().value();
    const category=this.filterForm.category().value();
    const sort=this.filterForm.sort().value()||'new'
    const discount=this.filterForm.discount().value();

    return this.products().filter(product=>{
      const productCategories=product.categories.map(c=>c.slug);
      let matchText=!text||product.name.toLowerCase().includes(text) ||
        product.slug.toLowerCase().includes(text.toLowerCase())||
        product._id.toLowerCase().includes(text);

      let matchDiscount=!discount||product.discount.active
     let matchStatus=!status||product.status===status;
     let matchCategory=!category||productCategories.includes(category)

      return (matchText&&matchStatus&&matchCategory&&matchDiscount);
    }).sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();

      if (sort === 'new') {
        return bTime - aTime; // جدیدترین اول
      }
      if (sort === 'old') {
        return aTime - bTime; // قدیمی‌ترین اول
      }

      if (sort === 'cheap') {
        return a.price - b.price ;
      }
      if (sort === 'expensive') {
        return b.price - a.price ;
      }

      if (sort === 'low') {
        return a.stockMeters - b.stockMeters ;
      }
      if (sort === 'top') {
        return b.stockMeters - a.stockMeters ;
      }
      return 0;
    })
  })
  readonly initialFilter = {
    text: '',
    status: '',
    sort: 'new',
    category: '',
    discount: false
  };
  filterSignal=signal(this.initialFilter);
  filterForm=form(this.filterSignal);

  constructor(private ProductService: ProductsService,private CategoryService:CategoryService) {
    this.getProduct();
    this.CategoryService.getAllCategories().subscribe(res=>{
      this.categories.set(res)
    })
  }

  getProduct(){
    this.ProductService.getProducts().subscribe(res => {
      this.loading.set(false);
      this.products.set(res);
    })
  }


  resetFilter(){
    this.filterForm().reset(this.initialFilter)
  }

}
