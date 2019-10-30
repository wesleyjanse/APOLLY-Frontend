import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Answer } from 'src/app/models/answer.model';
import { PollService } from '../poll.service';
import { Poll } from 'src/app/models/poll.model';
import { PollMember } from 'src/app/models/pollmember.model';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyPollsComponent } from '../my-polls/my-polls.component';
import { AuthenticateService } from 'src/app/login/services/authenticate.service';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent implements OnInit {
  @Input() name: string;
  @Input() createdOn: Date;
  @Input() answers: Observable<Answer>;
  @Input() pollID: number;
  @Input() private: string;
  pollOptionOne: String;
  pollOptionTwo: String;
  pollVotesOne: any;
  pollVotesTwo: any;
  totalVotes: any;
  creator: String;
  loggedInUsername: String;
  poll: Poll;
  pollOptions: string[] = [];
  pollVotes: string[] = [];
  edit: boolean = false;
  editForm: FormGroup;

  constructor(private _authenticateService: AuthenticateService, private _pollService: PollService, private fb: FormBuilder, private _pollSerivce: PollService, private _router: Router, private _myPollsComponent: MyPollsComponent) {
    this.editForm = this.fb.group({
      title: new FormControl('', Validators.compose(
        [Validators.minLength(5), Validators.required])),
      privateToggle: new FormControl(true, Validators.required)
    });
    this._authenticateService.isLoggedin.subscribe(e=> {
      if (localStorage.getItem('member') != null) {
        this.loggedInUsername =  JSON.parse(localStorage.getItem('member')).username;
      }
    });
  }

  ngOnInit() {
    this.countVotes();
    this._pollService.getPollMemberByPollID(this.pollID).subscribe(result => {
      this.creator = result.member.username;
    });

    this.editForm.reset(
      {
        title: this.name,
        privateToggle: this.private == "Private"? true: false
      }
    )
  }

  onEditClick() {
    this.edit = true;
  }
  onCancelClick(){
    this.edit = false;
  }

  onSubmit(){
    let pollToUpdate = new Poll(this.pollID, this.editForm.get("title").value, this.editForm.get("privateToggle").value, this.createdOn);
    this._pollSerivce.updatePoll(this.pollID, pollToUpdate).subscribe(()=>{
      this._myPollsComponent.ngOnInit();
      this.edit = false;
    });
  }

  countVotes() {
    this._pollService.getPoll(this.pollID).subscribe(result => {
      this.poll = result;
      var total: number = 0;
      for (let i = 0; i < Object.keys(result.answers).length; i++) {
          this.pollOptions.push(result.answers[i].possibleAnswer);
          total += result.answers[i].votes.length
      }
      this.totalVotes = total;
      for (let j = 0; j < this.pollOptions.length; j++) {
          this.pollVotes.push(String(Math.floor((result.answers[j].votes.length / total) * 100)))
      }
    });
  }
}
