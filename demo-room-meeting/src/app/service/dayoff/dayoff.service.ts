import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, headers } from '../../constant';

@Injectable({
  providedIn: 'root'
})
export class DayoffService {

  constructor(private http: HttpClient) { }

  add(dayoff: any): Observable<any> {
    return this.http.post(
      API_URL.addingDayOff,
      dayoff,
      { headers: headers }
    )
  }

  findAll(pageNumber: number): Observable<any> {
    return this.http.get(
      `${API_URL.findAllDayOff}/${pageNumber}`,
      { headers: headers }
    )
  }

  findAlll(): Observable<any> {
    return this.http.get(
      API_URL.findAlll,
      { headers: headers }
    )
  }

  countAll(): Observable<any> {
    return this.http.get(
      API_URL.countAllDayOff,
      { headers: headers }
    )
  }

  update(room: any): Observable<any> {
    return this.http.put(
      API_URL.updateDayOff,
      room, { headers: headers }
    )
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      `${API_URL.deleteDayOff}/${id}`,
      { headers: headers }
    )
  }
}
