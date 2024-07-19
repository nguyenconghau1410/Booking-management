import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ManageUserService } from '../../service/manage-user/manage-user.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule, NzPaginationModule, NzModalModule],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent {
  users: any
  id: string = ''
  index: number = -1
  pageIndex = 1
  pageTotal = 0
  pageSize = 2

  isVisible = false;
  constructor(
    private router: Router,
    private manageUserService: ManageUserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['page']) {
        this.manageUserService.findAll(this.pageIndex - 1).subscribe(
          (data) => {
            if (data) {
              this.users = data
            }
          }
        )
        return
      }
    })

    this.manageUserService.countAll().subscribe(
      (data) => {
        if (data) {
          this.pageTotal = data['total']
        }
      }
    )

    this.manageUserService.findAll(this.pageIndex - 1).subscribe(
      (data) => {
        if (data) {
          this.users = data
        }
      }
    )
  }

  onPageIndexChange(event: number) {
    this.pageIndex = event
    this.router.navigate(['home-page', 'manage-user'], { queryParams: { page: event } })
  }

  showModal(id: string, index: number): void {
    this.isVisible = true;
    this.id = id
    this.index = index
  }

  handleOk(): void {
    if (this.id !== '' && this.index !== -1) {
      this.manageUserService.deleteOne(this.id).subscribe(
        () => {
          alert('Delete success!')
          this.users.splice(this.index, 1)
        },
        (error) => {
          alert('An error hass occurred!')
        }
      )
    }
    this.isVisible = false
  }

  handleCancel(): void {
    this.isVisible = false
  }
}
