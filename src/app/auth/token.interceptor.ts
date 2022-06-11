import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, throwError, retry, switchMap, filter, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;

  //給初始值 null
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.getAccessToken()){
      request = this.addToken(request, this.authService.getAccessToken());
    }

    //handle and send, thus return a observable, then try catch error
    return next.handle(request).pipe(
      catchError(error=>{
        if(error instanceof HttpErrorResponse && error.status === 401){
          console.log("401 error!");
          return this.handle401Error(request, next);
        }else{
          return throwError(() => error); //so subscriber can catch error
        }
      })
    );
  }

  addToken(request: HttpRequest<any>, token: string|null)
  {
    return request.clone({
      setHeaders:{
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler)
  {
    // if get 401 error, we want to queue all http request
    // i.e. we'll block all request until refreshing is done
    // so we use behavior subject
    // switch map -> get the observable from previous one and generate the new Observable you offer
    if(!this.isRefreshing){
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((newAccessToken)=>{
          this.isRefreshing = false;
          this.refreshTokenSubject.next(newAccessToken);
          return next.handle(this.addToken(request, newAccessToken));
        })
      );
    }else{
      return this.refreshTokenSubject.pipe(
        filter(token => token!=null), //if not match, won't emit anything
        take(1),
        switchMap(token=>{
          return next.handle(this.addToken(request, token));
        })
      );
    }
  }
}
