import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { DayoffService } from '../../service/dayoff/dayoff.service';
@Component({
  selector: 'app-day-off-list',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule, NzPaginationModule, NzModalModule],
  templateUrl: './day-off-list.component.html',
  styleUrl: './day-off-list.component.scss'
})
export class DayOffListComponent {
  showCreatingForm = false
  showEditingForm = false
  isVisible = false
  dayoff = {
    id: null,
    name: '',
    description: '',
    startDay: '',
    endDay: ''
  }
  dayOffs: any = []

  pageIndex = 1
  pageSize = 3
  pageTotal = 0
  id = ''
  index = -1
  constructor(
    private dayOffService: DayoffService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['page']) {
        this.dayOffService.findAll(this.pageIndex - 1).subscribe(
          (data) => {
            if (data) {
              this.dayOffs = data
            }
          }
        )
        return
      }
    })
    this.dayOffService.countAll().subscribe(
      (data) => {
        this.pageTotal = data['total']
      }
    )

    this.dayOffService.findAll(this.pageIndex - 1).subscribe(
      (data) => {
        if (data) {
          this.dayOffs = data
        }
      }
    )
  }

  addingDayOff() {
    if (this.dayoff.name.trim() !== '' &&
      this.dayoff.startDay.trim() !== '' &&
      this.dayoff.endDay.trim() !== '' &&
      this.dayoff.description.trim() !== '') {
      this.dayOffService.add(this.dayoff).subscribe(
        (data) => {
          if (data) {
            this.dayOffs.push(data)
            this.dayoff = {
              id: null,
              name: '',
              description: '',
              startDay: '',
              endDay: ''
            }
            alert('Add success!')
          }
        },
        (error) => {
          alert(`An error has occurred, ${error.status}!`)
        }
      )
    }
    else {
      alert('Please, completely fill in all fields!')
    }
    this.showCreatingForm = false
  }

  editingRoom() {
    this.dayOffService.update(this.dayoff).subscribe(
      () => {
        alert('Edit success!')
        this.showEditingForm = false
      },
      (error) => {
        alert(`An erorr has occurred, ${error.status}!`)
      }
    )
  }



  showEditingFormMethod(index: number) {
    this.showEditingForm = true
    this.dayoff = this.dayOffs[index]
  }

  showCreatingFormMethod() {
    this.showCreatingForm = true
    this.setMinDate()
  }

  cancel() {
    this.showCreatingForm = false
    this.showEditingForm = false
    this.isVisible = false
    this.index = -1
    this.id = ''
    this.dayoff = {
      id: null,
      name: '',
      description: '',
      startDay: '',
      endDay: ''
    }
  }

  onPageIndexChange(event: number) {
    this.pageIndex = event
    this.router.navigate(['home-page', 'day-off-list'], { queryParams: { page: event } })
  }

  showModal(id: string, index: number): void {
    this.isVisible = true;
    this.id = id
    this.index = index
  }

  handleOk(): void {
    if (this.id !== '' && this.index !== -1) {
      this.dayOffService.delete(this.id).subscribe(
        () => {
          alert('Delete success!')
          this.dayOffs.splice(this.index, 1)
        },
        (error) => {
          alert('An error hass occurred!')
        }
      )
    }
    this.isVisible = false
  }

  setMinDate(): void {
    const datePickerStart: HTMLInputElement | null = document.getElementById('datePickerStart') as HTMLInputElement;
    const datePickerEnd: HTMLInputElement | null = document.getElementById('datePickerEnd') as HTMLInputElement;
    if (datePickerStart && datePickerEnd) {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();

      const todayFormatted = `${year}-${month}-${day}`;
      datePickerStart.min = todayFormatted;
      datePickerEnd.min = todayFormatted;
    }
  }
}
