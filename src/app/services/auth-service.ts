import {Injectable, signal, Signal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ApiAddressesUtility} from '../utilities/api-addresses.utility';
import {AuthRequest, AuthResponse, UserInfo} from '../dtos/auth.dto';
import {catchError, tap, throwError, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _isLoggedIn = signal(false);
  private _userInfo = signal<UserInfo | null>(null);

  get isLoggedIn(): Signal<boolean> {
    return this._isLoggedIn;
  }

  get userInfo(): Signal<UserInfo | null> {
    return this._userInfo;
  }

  constructor(private http: HttpClient) {
  }

  login(model: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(ApiAddressesUtility.login, model, {withCredentials: true})
      .pipe(
        tap(res => {
          this._isLoggedIn.set(true);
          this._userInfo.set(res.user);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Login failed:', error);
          this._isLoggedIn.set(false);
          this._userInfo.set(null);
          let message = '';
          if (error.error instanceof ErrorEvent) {
            message = 'ایترنت خود را برسی کنید'
          } else {
            message = `Server Error: ${error.status} ${error.error.message}`;
          }
          return throwError(() => new Error(message));
        })
      );
  }

  getMe(): Promise<void> {
    return this.http.get<AuthResponse>(ApiAddressesUtility.getMe, { withCredentials: true })
      .toPromise()
      .then(res => {
        this._isLoggedIn.set(true);
        // @ts-ignore
        this._userInfo.set(res?.user);
      })
      .catch(() => {
        this._isLoggedIn.set(false);
        this._userInfo.set(null);
      });
  }


  logout(): Observable<{message:string}> {
    return this.http.post<{message:string}>(ApiAddressesUtility.logout, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this._isLoggedIn.set(false);
          this._userInfo.set(null);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Logout failed:', error);
          this._isLoggedIn.set(false);
          this._userInfo.set(null);
          return throwError(() => new Error('Logout failed'));
        })
      );
  }

}
