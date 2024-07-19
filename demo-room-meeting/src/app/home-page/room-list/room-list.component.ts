import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RoomService } from '../../service/room/room.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule, NzPaginationModule, NzModalModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent {
  showCreatingForm = false
  showEditingForm = false
  isVisible = false
  room = {
    id: null,
    name: '',
    capacity: '',
    description: '',
    active: false
  }
  rooms: any = []

  pageIndex = 1
  pageSize = 3
  pageTotal = 0
  id = ''
  index = -1
  constructor(
    private roomService: RoomService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['page']) {
        this.roomService.findAll(this.pageIndex - 1).subscribe(
          (data) => {
            if (data) {
              this.rooms = data
            }
          }
        )
        return
      }
    })
    this.roomService.countAll().subscribe(
      (data) => {
        this.pageTotal = data['total']
      }
    )

    this.roomService.findAll(this.pageIndex - 1).subscribe(
      (data) => {
        if (data) {
          this.rooms = data
        }
      }
    )
  }

  addingRoom() {
    if (this.room.name.trim() !== '' &&
      this.room.capacity.trim() !== '' &&
      this.room.description.trim() !== '') {
      this.roomService.add(this.room).subscribe(
        (data) => {
          if (data) {
            this.rooms.push(data)
            this.room = {
              id: null,
              name: '',
              capacity: '',
              description: '',
              active: false
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
    this.roomService.update(this.room).subscribe(
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
    this.room = this.rooms[index]
  }

  showCreatingFormMethod() {
    this.showCreatingForm = true
  }

  cancel() {
    this.showCreatingForm = false
    this.showEditingForm = false
    this.isVisible = false
    this.index = -1
    this.id = ''
    this.room = {
      id: null,
      name: '',
      capacity: '',
      description: '',
      active: false
    }
  }

  onPageIndexChange(event: number) {
    this.pageIndex = event
    this.router.navigate(['home-page', 'room-list'], { queryParams: { page: event } })
  }

  showModal(id: string, index: number): void {
    this.isVisible = true;
    this.id = id
    this.index = index
  }

  handleOk(): void {
    if (this.id !== '' && this.index !== -1) {
      this.roomService.delete(this.id).subscribe(
        () => {
          alert('Delete success!')
          this.rooms.splice(this.index, 1)
        },
        (error) => {
          alert('An error hass occurred!')
        }
      )
    }
    this.isVisible = false
  }
}
