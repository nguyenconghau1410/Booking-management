import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      API_URL.login,
      {
        username: username,
        password: password
      }
    )
  }

  register(profile: any): Observable<any> {
    return this.http.post(
      API_URL.register,
      profile
    )
  }
}
