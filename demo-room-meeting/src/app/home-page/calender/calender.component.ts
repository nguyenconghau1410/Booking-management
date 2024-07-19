import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { RoomService } from '../../service/room/room.service';
import { DataService } from '../../service/data/data.service';
import { BookingService } from '../../service/booking/booking.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DayoffService } from '../../service/dayoff/dayoff.service';


@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule, FormsModule, FullCalendarModule, MatIconModule, NzModalModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss'
})
export class CalenderComponent {
  showCreatingForm = false
  showDetail = false
  showEditingForm = false
  isVisible = false
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    dayCellDidMount: this.customDayCellDidMount.bind(this),
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.handleDateClick.bind(this)
  }
  detailBooking: any
  listBooking: any = []
  rooms: any = []
  user: any
  id: string = ''
  events: { title: string, date: string, publicId: string }[] = []
  history = {
    id: null,
    userId: '',
    roomId: '',
    description: '',
    date: '',
    startTime: '',
    endTime: ''
  }
  specialDates: { [date: string]: string } = {
  }
  constructor(
    private roomService: RoomService,
    private dataService: DataService,
    private bookingService: BookingService,
    private dayOffService: DayoffService
  ) { }

  ngOnInit() {
    this.roomService.findAlll().subscribe(
      (data) => {
        if (data) {
          this.rooms = data
        }
      }
    )
    this.dataService.user?.subscribe(
      user => {
        this.user = user
      }
    )
    this.bookingService.findAlll().subscribe(
      (data) => {
        if (data) {
          this.listBooking = data
          for (let i = 0; i < data.length; i++) {
            this.events.push({ title: `${data[i].room.name} - ${data[i].startTime} -> ${data[i].endTime}`, date: data[i].date, publicId: data[i].id })
          }
          this.calendarOptions = {
            ...this.calendarOptions,
            events: this.events
          }
        }
      }
    )
    this.dayOffService.findAlll().subscribe(
      (data) => {
        if (data) {
          for (let i = 0; i < data.length; i++) {
            let start = new Date(data[i].startDay)
            let end = new Date(data[i].endDay)
            start.setDate(start.getDate() - 1)
            end.setDate(end.getDate() - 1)
            while (start <= end) {
              this.specialDates[start.toISOString().split('T')[0]] = "DAY OFF"
              start.setDate(start.getDate() + 1)
            }
          }
        }
      }
    )
    this.setMinDate()
  }

  handleEventClick(arg: any) {
    // alert(`Event: ${arg.event.extendedProps.publicId}`);
    this.showDetailMethod()
    for (let i = 0; i < this.listBooking.length; i++) {
      if (arg.event.extendedProps.publicId === this.listBooking[i].id) {
        this.detailBooking = this.listBooking[i]
        break
      }
    }
  }
  handleDateClick(arg: any) {
    if (this.specialDates[arg.dateStr]) alert('You are not allowed to book rooms in OFF DAYS!')
    else {
      this.showCreatingMethod()
      this.history.date = arg.dateStr
    }
  }

  customDayCellDidMount(arg: any) {
    const dateStr = arg.date.toISOString().split('T')[0]
    if (this.specialDates[dateStr]) {
      arg.el.innerHTML = `${this.specialDates[dateStr]}`
      arg.el.style.background = 'rgb(109, 205, 156, 0.5)'
      arg.el.style.textAlign = 'center'
      arg.el.style.border = '1px solid white'
    }
  }

  showCreatingMethod() {
    this.showCreatingForm = true
  }

  showEditingMethod(id: string) {
    this.showEditingForm = true
    for (let i = 0; i < this.listBooking.length; i++) {
      if (id === this.listBooking[i].id) {
        this.history = {
          id: this.listBooking[i].id,
          userId: this.listBooking[i].user.id,
          roomId: this.listBooking[i].room.id,
          description: this.listBooking[i].description,
          date: this.listBooking[i].date,
          startTime: this.listBooking[i].startTime,
          endTime: this.listBooking[i].endTime
        }
      }
    }
  }

  showDetailMethod() {
    this.showDetail = true
  }

  checkUser(booking: any): boolean {
    if (this.user.role.code === 'ADMIN') return true
    else {
      if (booking.user.id === this.user.id) return true
      else return false
    }
  }

  cancel() {
    this.showCreatingForm = false
    this.showDetail = false
    this.showEditingForm = false
    this.isVisible = false
  }

  bookingRoom() {
    this.history.userId = this.user['id']
    if (this.history.userId !== '' &&
      this.history.roomId !== '' &&
      this.history.description !== '' &&
      this.history.date !== '' &&
      this.history.startTime !== '' &&
      this.history.endTime !== '') {
      this.bookingService.booking(this.history).subscribe(
        (data) => {
          if (data) {
            alert('Booking room success!')
            window.location.href = '/home-page'
          }
        },
        (error) => {
          if (error.status === 302) alert('Your booking time is duplicated!')
          else alert('An error has occurred!')
        }
      )
      this.history = {
        id: null,
        userId: '',
        roomId: '',
        description: '',
        date: '',
        startTime: '',
        endTime: ''
      }
      this.showCreatingForm = false
    }
    else {
      alert('Please, completely fill in all fields!')
    }
  }

  editBookingRoom() {
    if (this.history.userId !== '' &&
      this.history.roomId !== '' &&
      this.history.description !== '' &&
      this.history.date !== '' &&
      this.history.startTime !== '' &&
      this.history.endTime !== '') {
      this.bookingService.update(this.history).subscribe(
        () => {
          alert('Update success!')
        },
        (error) => {
          alert(`An error has occurred, ${error.status}`)
        }
      )
    }
    this.showEditingForm = false
    this.showDetail = false
  }

  setMinDate(): void {
    const datePickerStart: HTMLInputElement | null = document.getElementById('datePicker') as HTMLInputElement;
    if (datePickerStart) {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();

      const todayFormatted = `${year}-${month}-${day}`;
      datePickerStart.min = todayFormatted;
    }
  }

  showModal(id: string): void {
    this.isVisible = true;
    this.id = id
  }

  handleOk(): void {
    if (this.id !== '') {
      this.bookingService.delete(this.id).subscribe(
        () => {
          alert('Delete success!')
          window.location.href = '/home-page'
        },
        (error) => {
          alert('An error hass occurred!')
        }
      )
    }
    this.isVisible = false
  }
}
