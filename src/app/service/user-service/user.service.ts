import { IUser } from './../../model/interface/IUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]>{
    return this.http.get<IUser[]>(''); //place in API
  }

  getUser(name: string='', ownID: string=''): Observable<IUser>{
    return this.http.get<IUser>('').pipe(
      filter(x => x.userName===name || x.userOwnID===ownID)
    );
  }
}
