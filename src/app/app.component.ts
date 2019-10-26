import { Component } from '@angular/core';
import { AuthenticateService } from './login/services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Apolly';
  member;

  userLoggedIn: boolean = false;

  constructor(private _authenticateService : AuthenticateService, private _router : Router) {
    this._authenticateService.isLoggedin.subscribe(e=> {
      if (localStorage.getItem('member') != null) {
        this.userLoggedIn = !this.userLoggedIn;
        this.member =  JSON.parse(localStorage.getItem('member'));
      }
    });
  }

  onClickLogout(){
    this._authenticateService.isLoggedin.next(false);
    localStorage.clear();
    this._router.navigate(['']);
  }
}
