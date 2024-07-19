import { Component, Inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DataService } from '../service/data/data.service';
import { ManageUserService } from '../service/manage-user/manage-user.service';
import { CommonModule } from '@angular/common';
import { BookingService } from '../service/booking/booking.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  user: any
  constructor(
    private router: Router,
    private dataService: DataService,
    private userService: ManageUserService,
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    if (!localStorage.getItem("access_token")) {
      this.router.navigate(['login']);
      return
    }
    this.userService.findOne().subscribe(
      (data) => {
        if (data) {
          this.user = data
          this.dataService.setUserSubject(data)
        }
      },
      (error) => {

      }
    )
  }

  redirect(index: number) {
    if (index === 0) {
      this.router.navigate(['home-page', 'calender'])
    }
    else if (index === 1) {
      this.router.navigate(['home-page', 'manage-user'])
    }
    else if (index === 2) {
      this.router.navigate(['home-page', 'room-list'])
    }
    else if (index === 3) {
      this.router.navigate(['home-page', 'day-off-list'])
    }
    else if (index === 4) {
      this.bookingService.install().subscribe(
        (response: Blob) => {
          const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        },
        (error) => {
          console.error('Lỗi khi tải file Excel:', error);
        }
      )
    }
    else {
      localStorage.removeItem("access_token")
      alert("Logged out!")
      this.router.navigate(['login'])
    }
  }
}
