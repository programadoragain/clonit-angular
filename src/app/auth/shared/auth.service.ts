import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { SignupRequestPayload } from 'src/app/auth/signup/signup-request.payload';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response';
import { LocalStorageService } from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ROUTE_SERVER: string= "http://localhost:8080/";  

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {}

   signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(this.ROUTE_SERVER + "api/auth/signup", signupRequestPayload, { responseType: 'text'});
   }

   login(LoginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(this.ROUTE_SERVER + "api/auth/login", LoginRequestPayload)
                    .pipe(map(data => {
                      this.localStorage.store('authenticationToken', data.authenticationToken);
                      this.localStorage.store('username', data.username);
                      this.localStorage.store('refreshToken', data.refreshToken);
                      this.localStorage.store('expiresAt', data.expiresAt);

                      this.loggedIn.emit(true);
                      this.username.emit(data.username);
                      return true;
                                      }));
   }

   logout() {
    this.httpClient.post(this.ROUTE_SERVER + "logout", this.refreshTokenPayload, { responseType: 'text' })
      .subscribe(data => { console.log(data); }, error => { throwError(error); })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }
  
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>(this.ROUTE_SERVER + 'auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

}
