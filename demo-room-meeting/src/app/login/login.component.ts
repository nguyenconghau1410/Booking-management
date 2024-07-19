import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string = ''
  password: string = ''

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  login() {
    if (this.username !== '' && this.password !== '') {
      this.authService.login(this.username, this.password).subscribe(
        (data) => {
          if (data) {
            localStorage.setItem("access_token", data['access_token'])
            setTimeout(() => {
              alert("Login success!")
              window.location.href = '/home-page'
            }, 1000)
          }
        },
        (error) => {
          alert(`An error has occurred, ${error.status}`)
        }
      )
    }
    else {
      alert("Completely fill in all fields!")
    }
  }


}
