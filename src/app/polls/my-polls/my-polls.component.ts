import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Observable } from 'rxjs';
import { PollMember } from 'src/app/models/pollmember.model';
import { AuthenticateService } from 'src/app/login/services/authenticate.service';
import { Member } from 'src/app/models/member.model';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.scss']
})
export class MyPollsComponent implements OnInit {

  polls: Observable<PollMember[]>;
  member: Member;
  edit: boolean = true;
  create: boolean = false;
  CreateText: string = "Create new";

  constructor(private _pollService: PollService, private _authenticateService: AuthenticateService) {
    this._authenticateService.isLoggedin.subscribe(e=> {
      if (localStorage.getItem('member') != null) {
        this.member =  JSON.parse(localStorage.getItem('member'));
      }
    });
  }

  onClickCreate(){
    this.create = !this.create;
    if (this.create) {
      this.CreateText = "Close"
    }
    else{
      this.CreateText = "Create new"
    }
  }

  ngOnInit() {
    this.CreateText = "Create new"
    this.polls = this._pollService.getPollsByMemberID(this.member.memberID);
  }
}
