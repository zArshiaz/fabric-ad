import {Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {CategoryDto} from '../dtos/product.dto';
import {HttpClient} from '@angular/common/http';
import {CategoryForm, GetAllCategoryDto} from '../dtos/category.dto';
import {Observable, tap} from 'rxjs';
import {ApiAddressesUtility} from '../utilities/api-addresses.utility';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: WritableSignal<CategoryDto[]>=signal([]);
  constructor(private http: HttpClient) {
    this.getAllCategories()
      .subscribe(res => this.categories.set(res))
  }


  getAllCategories():Observable<CategoryDto[]> {
   return  this.http.get<GetAllCategoryDto>(ApiAddressesUtility.getCategories).pipe(tap(res => this.categories.set(res)));
  }
  addCategory(cat:CategoryForm):Observable<any> {
   return  this.http.post<GetAllCategoryDto>(ApiAddressesUtility.addCategories,cat,{withCredentials:true})
  }
  deleteCategoryById(id:string):Observable<any> {
   return  this.http.delete(ApiAddressesUtility.deleteCategory+id,{withCredentials:true})
  }
  editCategoryById(id:string,data:CategoryForm):Observable<any> {
   return  this.http.post(ApiAddressesUtility.deleteCategory+id,data,{withCredentials:true})
  }

}
