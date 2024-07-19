import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, headers } from '../../constant';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  add(room: any): Observable<any> {
    return this.http.post(
      API_URL.addingRoom,
      room,
      { headers: headers }
    )
  }

  findAll(pageNumber: number): Observable<any> {
    return this.http.get(
      `${API_URL.findAllRooms}/${pageNumber}`,
      { headers: headers }
    )
  }
  countAll(): Observable<any> {
    return this.http.get(
      API_URL.countAllRooms,
      { headers: headers }
    )
  }

  update(room: any): Observable<any> {
    return this.http.put(
      API_URL.updateRoom,
      room, { headers: headers }
    )
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      `${API_URL.deleteRoom}/${id}`,
      { headers: headers }
    )
  }

  findAlll(): Observable<any> {
    return this.http.get(
      API_URL.findAlllRooms,
      { headers: headers }
    )
  }
}
