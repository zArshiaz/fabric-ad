import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {ProductDto} from '../dtos/product.dto';

@Injectable({ providedIn: 'root' })
export class FormService {

  // Validator برای حداقل انتخاب یک دسته‌بندی
  atLeastOneSelected: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formArray = control as FormArray;
    const isAnySelected = formArray.controls.some(ctrl => ctrl.get('selected')?.value);
    return isAnySelected ? null : { atLeastOne: true };
  };

  createProductForm(categories: any[] = []): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      slug: new FormControl('', [Validators.required]),
      shortDescription: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      pricePerMeter: new FormControl('', [Validators.required, Validators.min(20000)]),
      stockMeters: new FormControl('', [Validators.required, Validators.min(0)]),
      brand: new FormControl('', [Validators.required]),
      colorName: new FormControl('', [Validators.required]),
      pattern: new FormControl('', [Validators.required]),
      widthCm: new FormControl('', [Validators.required, Validators.min(30)]),
      composition: new FormControl('', [Validators.required]),
      seo: new FormGroup({
        metaTitle: new FormControl('', [Validators.required]),
        metaDescription: new FormControl('', [Validators.required]),
      }),
      discount: new FormGroup({
        active: new FormControl(false),
        percent: new FormControl(1, [Validators.min(1), Validators.max(100)]),
      }),
      finish: new FormArray([]),
      categories: new FormArray(
        categories.map(c => new FormGroup({
          _id: new FormControl(c._id),
          name: new FormControl(c.name),
          selected: new FormControl(false),
        })),
        [this.atLeastOneSelected]
      ),
      status: new FormControl('active', [Validators.required]),
      images: new FormControl([], []),
    });
  }

  createFinishForm(): FormControl {
    return new FormControl('', [Validators.required]);
  }

  getFinishes(form: FormGroup): FormArray {
    return form.get('finish') as FormArray;
  }

  addFinish(form: FormGroup) {
    this.getFinishes(form).push(this.createFinishForm());
  }

  removeFinish(form: FormGroup, index: number) {
    this.getFinishes(form).removeAt(index);
  }

  getCategoriesControls(form: FormGroup) {
    return (form.get('categories') as FormArray).controls;
  }

  updateCategories(form: FormGroup, categories: any[]) {
    const categoriesArray = form.get('categories') as FormArray;
    categoriesArray.clear();
    for (const c of categories) {
      categoriesArray.push(new FormGroup({
        _id: new FormControl(c._id),
        name: new FormControl(c.name),
        selected: new FormControl(false),
      }));
    }
  }

  onFileChange(event: any, form: FormGroup, previews: string[], maxFiles: number = 4) {
    const files: FileList = event.target.files;
    if (files.length > maxFiles) {
      alert(`تعداد عکس‌ها باید حداکثر ${maxFiles} عدد باشد`);
      form.get('images')?.reset([]);
      event.target.value = null;
      previews.length = 0;
      return;
    }

    const fileArray: File[] = [];
    previews.length = 0;

    for (let i = 0; i < files.length; i++) {
      fileArray.push(files[i]);

      const reader = new FileReader();
      reader.onload = (e: any) => previews.push(e.target.result);
      reader.readAsDataURL(files[i]);
    }

    form.patchValue({ images: fileArray });
  }

  patchProductForm(form: FormGroup, product: ProductDto) {

    form.patchValue({
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription,
      description: product.description,
      pricePerMeter: product.pricePerMeter,
      stockMeters: product.stockMeters,
      brand: product.brand,
      colorName: product.colorName,
      pattern: product.pattern,
      widthCm: product.widthCm,
      composition: product.composition,
      status: product.status,
      seo: {
        metaTitle: product.seo.metaTitle,
        metaDescription: product.seo.metaDescription
      },
      discount: {
        active: product.discount.active,
        percent: product.discount.percent
      },
      // images: product.images
    });
    console.log(form.get('discount')?.value)

    const finishArray = form.get('finish') as FormArray;
    finishArray.clear();
    for (const f of product.finish) {
      finishArray.push(new FormControl(f, Validators.required));
    }

    const categoriesArray = form.get('categories') as FormArray;

    for (let i = 0; i < categoriesArray.length; i++) {
      const ctrl = categoriesArray.at(i);
      const id = ctrl.get('_id')?.value;

      product.categories.forEach(c=>{
        if(id==c._id) {
          ctrl.patchValue({
            selected: true
          });
        }
      })


    }
  }


}
