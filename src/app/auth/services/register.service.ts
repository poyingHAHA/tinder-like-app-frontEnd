import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register';
import { Response } from 'src/app/model/interface/Response';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  register(registerInfo: Register): Observable<Response>
  {
    console.log(registerInfo);
    return this.http.post<Response>(`${environment.domain}/register`, registerInfo);
  }
}
