import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, headers } from '../../constant';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(private http: HttpClient) { }

  findAll(pageNumber: number): Observable<any> {
    return this.http.get(
      `${API_URL.findAll}/${pageNumber}`,
      { headers: headers }
    )
  }

  countAll(): Observable<any> {
    return this.http.get(
      `${API_URL.countAllUsers}`,
      { headers: headers }
    )
  }

  findOne(): Observable<any> {
    return this.http.get(
      API_URL.findOne,
      { headers: headers }
    )
  }

  deleteOne(id: string): Observable<any> {
    return this.http.delete(
      `${API_URL.deleteOne}/${id}`,
      { headers: headers }
    )
  }
}
