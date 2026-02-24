import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NavbarForm, NavbarItem, NavbarList} from '../dtos/navbar.dto';
import {HttpClient} from '@angular/common/http';
import {ApiAddressesUtility} from '../utilities/api-addresses.utility';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  http = inject(HttpClient)


  getAllNavbar(): Observable<NavbarList> {
    return this.http.get<NavbarList>(ApiAddressesUtility.getNavbarItemsAndAddItem)
  }

  addNavbar(navbar: NavbarForm): Observable<NavbarItem> {
    return this.http.post<NavbarItem>(ApiAddressesUtility.getNavbarItemsAndAddItem, navbar)
  }

  editNavbar(id:string,newValue: NavbarForm): Observable<NavbarItem> {
    return this.http.post<NavbarItem>(ApiAddressesUtility.editAndDeleteNavbarItem+id, newValue)
  }

  deleteNavbar(id:string): Observable<NavbarItem> {
    return this.http.delete<NavbarItem>(ApiAddressesUtility.editAndDeleteNavbarItem+id)
  }
}
