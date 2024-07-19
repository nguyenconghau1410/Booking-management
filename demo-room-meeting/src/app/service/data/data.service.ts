import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userSubject: BehaviorSubject<any> = new BehaviorSubject<string | null>(null)
  public user: Observable<any> | undefined

  constructor() {
    this.user = this.userSubject.asObservable()
  }

  setUserSubject(user: any) {
    this.userSubject.next(user)
  }
}
