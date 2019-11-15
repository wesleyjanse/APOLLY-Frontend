import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member.model';
import { AuthenticateService } from '../login/services/authenticate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  memberName: string = "";

  constructor(private _authenticateService : AuthenticateService) {
    if (localStorage.getItem('member') != null) {
      this._authenticateService.isLoggedin.subscribe(e=> {
        let member = JSON.parse(localStorage.getItem('member'));
        this.memberName = member.username;
      })
    }
  }
  
  ngOnInit() {
  }
}
