import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CalenderComponent } from './home-page/calender/calender.component';
import { ManageUserComponent } from './home-page/manage-user/manage-user.component';
import { RoomListComponent } from './home-page/room-list/room-list.component';
import { DayOffListComponent } from './home-page/day-off-list/day-off-list.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'home-page',
        component: HomePageComponent,
        children: [
            { path: '', component: CalenderComponent },
            { path: 'calender', component: CalenderComponent },
            { path: 'manage-user', component: ManageUserComponent },
            { path: 'room-list', component: RoomListComponent },
            { path: 'day-off-list', component: DayOffListComponent },
        ]
    }
];
