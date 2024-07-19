import { HttpHeaders } from "@angular/common/http"

export const BASE_URL = "http://localhost:8080/api/v1"
export const API_URL = {
    login: BASE_URL + '/user/auth/login',
    register: BASE_URL + '/user/auth/register',
    findAll: BASE_URL + '/user/management/find-all',
    countAllUsers: BASE_URL + '/user/management/count-all',
    findOne: BASE_URL + '/user/findOne',
    deleteOne: BASE_URL + '/user/management/delete',
    addingRoom: BASE_URL + '/room/management/add',
    findAllRooms: BASE_URL + '/room/management/find-all',
    findAlllRooms: BASE_URL + '/room/find-all',
    countAllRooms: BASE_URL + '/room/management/count-all',
    updateRoom: BASE_URL + '/room/management/update',
    deleteRoom: BASE_URL + '/room/management/delete',
    findAlll: BASE_URL + '/dayoff/find-all',
    addingDayOff: BASE_URL + '/dayoff/management/add',
    findAllDayOff: BASE_URL + '/dayoff/management/find-all',
    countAllDayOff: BASE_URL + '/dayoff/management/count-all',
    updateDayOff: BASE_URL + '/dayoff/management/update',
    deleteDayOff: BASE_URL + '/dayoff/management/delete',
    bookingRoom: BASE_URL + '/history/booking',
    findAllBooking: BASE_URL + '/history/find-all',
    deleteBooking: BASE_URL + '/history/delete',
    updateBooking: BASE_URL + '/history/update',
    install: BASE_URL + '/history/management/export-excel'
}

export const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)

