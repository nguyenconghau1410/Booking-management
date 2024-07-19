import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  profile = {
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register() {
    if (this.profile.email !== '' && this.profile.firstName !== '' && this.profile.lastName !== ''
      && this.profile.email !== '' && this.profile.password !== '' && this.profile.confirmPassword !== '') {
      if (this.profile.password === this.profile.confirmPassword) {
        this.authService.register(this.profile).subscribe(
          (data) => {
            if (data) {
              localStorage.setItem("access_token", data['access_token'])
              alert("Register success")
              window.location.href = '/home-page'
            }
          },
          (error) => {
            alert(`An error has occurred, ${error.status}!`)
          }
        )
      }
      else {
        alert("Password and ConfirmPassword don't match!")
      }
    }
    else {
      alert('Please, completely fill in all fields!')
    }
  }
}
