import { Component } from '@angular/core';
import { AuthenticateService } from './login/services/authenticate.service';
import { Router } from '@angular/router';
import { NotificationService } from './notifications/notification.service';
import { Member } from './models/member.model';
import { RegisterService } from './login/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Apolly';
  member: Member;
  userLoggedIn: boolean = false;
  notificationCount: number;

  constructor(private _authenticateService: AuthenticateService, private _router: Router, private _notificationService: NotificationService, private _registerService: RegisterService) {
    this._authenticateService.isLoggedin.subscribe(e => {
      if (localStorage.getItem('member') != null) {
        this.userLoggedIn = !this.userLoggedIn;
        this.member = JSON.parse(localStorage.getItem('member'));
        setInterval(() => {
          if (this._authenticateService.checkLoggedIn) {
            this._notificationService.getNotificationCount(this.member.memberID).subscribe((result => {
              this.notificationCount = result;
            }))
          }
        }, 1 * 1000)
      }
    });
  }

  onClickLogout() {
    this._authenticateService.isLoggedin.next(false);
    localStorage.clear();
    this._router.navigate(['']);
  }
}
