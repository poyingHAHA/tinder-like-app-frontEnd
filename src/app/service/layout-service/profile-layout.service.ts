import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileLayoutService {
  private optionSubject: BehaviorSubject<string>;

  constructor() {
    this.optionSubject = new BehaviorSubject<string>("");
  }

  setOption(type: string): void
  {
    this.optionSubject.next(type);
  }

  getOption$(): Observable<string>
  {
    return this.optionSubject.asObservable();
  }
}
