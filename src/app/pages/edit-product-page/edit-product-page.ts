import {Component, effect, signal} from '@angular/core';
import {CategoryService} from '../../services/category-service';
import {ProductsService} from '../../services/products-serves';
import {FormArray, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../../services/form-service';
import {ActivatedRoute} from '@angular/router';
import {PageHeader} from '../../components/page-header/page-header';
import {InputErrors} from '../../components/input-errors/input-errors';
import {NgIcon} from '@ng-icons/core';
import {ImageDto, ProductDto} from '../../dtos/product.dto';
import {toast} from '../../utilities/swal-toast-utility';
import {Alert} from '../../components/alert/alert';
import {Loading} from '../../components/loading/loading';

@Component({
  selector: 'app-edit-product-page',
  templateUrl: './edit-product-page.html',
  styleUrls: ['./edit-product-page.css'],
  imports: [
    PageHeader,
    InputErrors,
    ReactiveFormsModule,
    NgIcon,
    Alert,
    Loading
  ]
})
export class EditProductPage {
  productForm: FormGroup;
  imagePreviews: string[] = [];
  prevImages: ImageDto[] = [];
  product: ProductDto | undefined;
  loading = signal(false);
  pageLoading = signal(true);
  error = signal(false);

  constructor(
    private formService: FormService,
    private categoryService: CategoryService,
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.productForm = this.formService.createProductForm();
    this.loadProduct();
    effect(() => {
      const list = categoryService.categories();
      if (!list || list.length === 0) return;
      this.formService.updateCategories(this.productForm, list);
    });
  }

  get finishes(): FormArray {
    return this.formService.getFinishes(this.productForm);
  }

  addFinish() {
    this.formService.addFinish(this.productForm);
  }

  removeFinish(index: number) {
    this.formService.removeFinish(this.productForm, index);
  }

  get categoriesControl() {
    return this.formService.getCategoriesControls(this.productForm);
  }

  onFileChange(event: any) {
    this.formService.onFileChange(event, this.productForm, this.imagePreviews);
  }

  loadProduct(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      console.log(slug);

      if (slug) {
        this.productService.getProductBySlug(slug).subscribe({
          next: product => {
            this.product = product;
            this.imagePreviews = product.images?.map(item => item.url);
            this.prevImages = product.images
            this.formService.patchProductForm(this.productForm, product);
            this.pageLoading = signal(false);
          },
          error: error => {
           if(error) this.error.set(true);
          }
          }
        );
      }
    });
  }

  submit() {

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    console.log(this.productForm.value)

    if (this.product) this.productService.editProduct(this.product._id, this.productForm.value, this.prevImages)
      .then(res => {
        this.loading.set(false);
        if (res.successes) {
          toast.fire({
            text: 'محصول تغییر یافت.',
            icon: 'success',
          })
        } else {
          toast.fire({
            text: 'خطا در تغییر محصول',
            icon: 'error',
          })
        }
      })


  }
}
