import { catchError, mapTo, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { localURI as base } from '../../config';
import { Tokens } from '../models/token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //easy to use intelligence
  private readonly ACCESS_TOKEN = "ACCESS_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";
  private readonly LOGGED_USER = "LOGGED_USER";

  // private loggedUser: string = "";
  // public get LoggedUser(){
  //   return this.loggedUser;
  // }

  constructor(private http: HttpClient) {
  }

  login(user:{email: string, password: string}): Observable<boolean>
  {
    //使用environment 點參數
    return this.http.post<Tokens>(`${base}/login`, user)
    .pipe(
      tap(tokens => this.doLoginUser(user.email, tokens)), //side effect
      mapTo(true), //map a each observable to a given value
      catchError(err => {
        alert(err.error); //alert popout
        return of(false); //return an observable of false
      })
    )
  }

  logout()
  {
    this.http.post<any>(`${base}/logout`, {
      'refreshToken': this.getRefreshToken
    }).pipe(
      tap(()=>{this.doLogoutUser()}),
      mapTo(true),
      catchError(err=>{
        console.log(err);
        alert(err.error);
        return of(false);
      })
    );
  }

  isLoggedIn()
  {
    //turn to boolean type and reverse
    //undefined -> true -> false
    return !!this.getAccessToken();
  }

  refreshToken()
  {
    //index route may change
    return this.http.post<any>(`${base}/index/refresh`,
    {email: this.getLoggedUser(), refreshToken: this.getRefreshToken()})
    .pipe(
      tap((token: any)=>{
        this.storeAccessToken(token);
      })
    );
  }

  public getAccessToken()
  {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  public getRefreshToken()
  {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  public getLoggedUser()
  {
    return localStorage.getItem(this.LOGGED_USER);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    // this.loggedUser = username; //can change to Buyer and extract email
    //it will be refreshed when reload page
    this.storeUser(username);
    this.storeTokens(tokens);
  }

  private doLogoutUser()
  {
    // this.loggedUser = "";
    this.removeUser();
    this.removeTokens();
  }

  private storeAccessToken(token: string){
    localStorage.setItem(this.ACCESS_TOKEN, token);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private storeUser(user: string){
    localStorage.setItem(this.LOGGED_USER, user);
  }

  private removeUser(){
    localStorage.removeItem(this.LOGGED_USER);
  }
}
