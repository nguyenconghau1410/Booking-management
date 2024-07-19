import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, headers } from '../../constant';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  booking(data: any): Observable<any> {
    return this.http.post(
      API_URL.bookingRoom,
      data,
      { headers: headers }
    )
  }

  findAlll(): Observable<any> {
    return this.http.get(
      API_URL.findAllBooking,
      { headers: headers }
    )
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      `${API_URL.deleteBooking}/${id}`,
      { headers: headers }
    )
  }

  update(data: any): Observable<any> {
    return this.http.put(
      API_URL.updateBooking,
      data, { headers: headers }
    )
  }

  install(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
    return this.http.get<Blob>(
      API_URL.install,
      { responseType: 'blob' as 'json', headers }
    )
  }
}
