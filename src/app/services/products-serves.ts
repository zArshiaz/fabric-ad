import {Injectable, model} from '@angular/core';
import { ImageDto, ProductDto, ProductFormDto} from '../dtos/product.dto';
import {firstValueFrom, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiAddressesUtility} from '../utilities/api-addresses.utility';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductDto[]> {

    return this.http.get<ProductDto[]>(ApiAddressesUtility.getProducts);
  }

  getProductBySlug(slug: string): Observable<ProductDto> {
    return this.http.get<ProductDto>(ApiAddressesUtility.getProduct+slug,{withCredentials:true})
  }
  async addProduct(p: ProductFormDto): Promise<{ message: string; successes: boolean }> {
    const formData = new FormData();

    formData.append('name', p.name);
    formData.append('slug', p.slug);
    formData.append('shortDescription', p.shortDescription);
    formData.append('description', p.description);
    formData.append('pricePerMeter', p.pricePerMeter.toString());
     formData.append('stockMeters', p.stockMeters.toString());
     formData.append('brand', p.brand);
    formData.append('colorName', p.colorName);
     formData.append('pattern', p.pattern);
   formData.append('composition', p.composition);
   formData.append('widthCm', p.widthCm.toString());
   p.finish.forEach(f => formData.append('finish[]', f));
    formData.append('status', p.status);

    const categories = p.categories.filter(c => c.selected).map(c => c._id);
    categories.forEach(c => formData.append('categories[]', c));

    formData.append('seo', JSON.stringify(p.seo));


    if (p.discount) formData.append('discount', JSON.stringify({
      active: p.discount.active,
      percent: p.discount.percent
    }));

    if (p.images && p.images.length > 0) {
      p.images.forEach(file => formData.append('images', file, file.name));
    }

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const res = await firstValueFrom(
        this.http.post(ApiAddressesUtility.addProducts, formData, { withCredentials: true })
      );
      console.log(res);
      return { message: 'محصول با موفقیت اضافه شد', successes: true };
    } catch (error) {
      console.error(error);
      return { message: 'خطا در اضافه کردن محصول', successes: false };
    }
  }
  async editProduct(id:string,newValue: ProductFormDto,prevImages:ImageDto[]): Promise<{ message: string; successes: boolean }> {
    const formData = new FormData();

    formData.append('name', newValue.name);
    formData.append('slug', newValue.slug);
    formData.append('shortDescription', newValue.shortDescription);
    formData.append('description', newValue.description);
    formData.append('pricePerMeter', newValue.pricePerMeter.toString());
    formData.append('stockMeters', newValue.stockMeters.toString());
    formData.append('brand', newValue.brand);
    formData.append('colorName', newValue.colorName);
    formData.append('pattern', newValue.pattern);
    formData.append('composition', newValue.composition);
    formData.append('widthCm', newValue.widthCm.toString());
    newValue.finish.forEach(f => formData.append('finish[]', f));
    formData.append('status', newValue.status);

    const categories = newValue.categories.filter(c => c.selected).map(c => c._id);
    categories.forEach(c => formData.append('categories[]', c));

    formData.append('seo', JSON.stringify(newValue.seo));

    prevImages.forEach(prevImage => {
      formData.append('prevImages[]',JSON.stringify(prevImage));
    })

    if (newValue.discount) formData.append('discount', JSON.stringify({
      active: newValue.discount.active,
      percent: newValue.discount.percent
    }));

    if (newValue.images && newValue.images.length > 0 && newValue.images[0] instanceof File) {
      newValue.images.forEach(file => formData.append('images', file, file.name));
    }



    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const res = await firstValueFrom(
        this.http.post(ApiAddressesUtility.editProduct+id, formData, { withCredentials: true })
      );
      console.log(res);
      return { message: 'محصول با موفقیت  تغییر یافت', successes: true };
    } catch (error) {
      console.error(error);
      return { message: 'خطا در تغییر  محصول', successes: false };
    }
  }

  deleteProduct(id:string):Observable<any> {
    return this.http.delete(ApiAddressesUtility.deleteProduct+id, {withCredentials: true});
  }
}
