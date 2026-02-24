import {Component, effect, signal, WritableSignal} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule, isFormControl,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {CategoryDto, ProductFormDto} from '../../dtos/product.dto';
import {CategoryService} from '../../services/category-service';
import {PageHeader} from '../../components/page-header/page-header';
import {NgIcon} from '@ng-icons/core';
import {validate} from '@angular/forms/signals';
import {InputErrors} from '../../components/input-errors/input-errors';
import {ProductsService} from '../../services/products-serves';
import {FormService} from '../../services/form-service';
import {toast} from '../../utilities/swal-toast-utility';

@Component({
  selector: 'app-add-product-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PageHeader,
    NgIcon,
    InputErrors
  ],
  templateUrl: './add-product-page.html',
  styleUrl: './add-product-page.css',
})
export class AddProductPage {

  constructor(private categoryService: CategoryService,private productService: ProductsService,private formService:FormService) {
    this.productForm=formService.createProductForm()
    effect(() => {
      const list = categoryService.categories();  // مقدار سیگنال
      if (!list || list.length === 0) return;
      formService.updateCategories(this.productForm,list)
    });
  }

  loading=signal(false)
  productForm: FormGroup;
  imagePreviews: string[] = [];



  get createFinishForm(){
   return this.formService.createFinishForm()
 }

  get finishes() {
    return this.formService.getFinishes(this.productForm)
  }


  addFinish() {
     this.formService.addFinish(this.productForm)
  }

  removeFinish(index: number) {
   return this.formService.removeFinish(this.productForm, index)
  }

  get categoriesControl() {
    return this.formService.getCategoriesControls(this.productForm)
  }


  onFileChange(event: any) {
    this.formService.onFileChange(event,this.productForm,this.imagePreviews)
  }

  submit() {
      if(this.productForm.invalid ) {
      this.productForm.markAllAsTouched()
      return;
    }
    this.loading.set(true)
    this.productService.addProduct(this.productForm.value).then(r => {
      if (r.successes) {
        toast.fire({
          text: 'محصول افزوده شد',
          icon: 'success',
        })
      }else {
        toast.fire({
          text: 'خطا در افزودن محصول',
          icon: 'success',
        })
      }
      this.loading.set(false)
    } );
  }
}
