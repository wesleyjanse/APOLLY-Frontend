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

  polls: Observable<PollMember[]>;
  privatePolls: PollMember[];
  member: Member;

  constructor(private _pollService: PollService, private fb: FormBuilder, private _authenticateService: AuthenticateService) {
    this._authenticateService.isLoggedin.subscribe(e => {
      if (localStorage.getItem('member') != null) {
        this.member = JSON.parse(localStorage.getItem('member'));
      }
    });
    this.polls = this._pollService.getPolls();
    this._pollService.getPollsByMemberID(this.member.memberID).subscribe((result) => {
      var creator: Member;
      this.privatePolls = result
      console.log(this.privatePolls);
      this.privatePolls.forEach(element => {
        this._pollService.getCreatorFromPoll(element.pollID).subscribe((result) => {
            creator = result;
            element.creatorName = creator.username;
        }); 
      });
    });
  }

  ngOnInit() {

  }
}
