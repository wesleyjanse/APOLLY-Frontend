import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Observable } from 'rxjs';
import { PollMember } from '../../models/pollmember.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/login/services/authenticate.service';
import { Member } from 'src/app/models/member.model';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {

  polls: PollMember[];
  privatePolls: PollMember[];
  member: Member;
  creator: Member;
  constructor(private _pollService: PollService, private fb: FormBuilder, private _authenticateService: AuthenticateService) {
    this._authenticateService.isLoggedin.subscribe(e => {
      if (localStorage.getItem('member') != null) {
        this.member = JSON.parse(localStorage.getItem('member'));
      }
    });
    this._pollService.getPolls().subscribe((result) => {
      this.polls = result;
      this.polls.forEach(poll => {
        if (!poll.poll.Private) {
          this._pollService.getCreatorFromPoll(poll.pollID).subscribe((result) => {
            this.creator = result;
            poll.creatorName = this.creator.username;
        }); 
        }
      })
    });
    this._pollService.getPollsByMemberID(this.member.memberID).subscribe((result) => {
      this.privatePolls = result
      this.privatePolls.forEach(element => {
        this._pollService.getCreatorFromPoll(element.pollID).subscribe((result) => {
            this.creator = result;
            element.creatorName = this.creator.username;
        }); 
      });
    });
  }

  ngOnInit() {

  }
}
