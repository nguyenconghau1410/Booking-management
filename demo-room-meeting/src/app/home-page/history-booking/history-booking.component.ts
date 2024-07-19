import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
@Component({
  selector: 'app-history-booking',
  standalone: true,
  imports: [MatIconModule, CommonModule, NzPaginationModule],
  templateUrl: './history-booking.component.html',
  styleUrl: './history-booking.component.scss'
})
export class HistoryBookingComponent {

}
