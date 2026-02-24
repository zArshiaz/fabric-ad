import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetUsersResponse, UserCommentsDto, UserDto, UserForm} from '../dtos/user.dto';
import {ApiAddressesUtility} from '../utilities/api-addresses.utility';
import {CommentDto} from '../dtos/comment.dto';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<GetUsersResponse> {
    return this.http.get<GetUsersResponse>(ApiAddressesUtility.getAllUsers, {withCredentials: true})
  }
  getUserInfoById(id:string): Observable<UserDto> {
    return this.http.get<UserDto>(ApiAddressesUtility.getUser+id, {withCredentials: true})
  }
  getUserCommentsById(id:string): Observable<UserCommentsDto[]> {
    return this.http.get<UserCommentsDto[]>(ApiAddressesUtility.getUserComments+id, {withCredentials: true})
  }
  editUserById(id:string,data:UserForm): Observable<UserDto> {
    return this.http.post<UserDto>(ApiAddressesUtility.editUser+id,data, {withCredentials: true})
  }
}
