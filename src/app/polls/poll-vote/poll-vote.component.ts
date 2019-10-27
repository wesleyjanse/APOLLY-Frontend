import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/models/answer.model';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { VoteService } from '../vote.service';
import { Vote } from 'src/app/models/vote.model';
import { AuthenticateService } from 'src/app/login/services/authenticate.service';
import { Member } from 'src/app/models/member.model';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.scss']
})
export class PollVoteComponent implements OnInit {

  constructor(private fb: FormBuilder, private _voteService: VoteService, private _authenticateService: AuthenticateService) {
    this._authenticateService.isLoggedin.subscribe(e => {
      if (localStorage.getItem('member') != null) {
        this.member = JSON.parse(localStorage.getItem('member'));
      }
    });
  }

  ngOnInit() {
  }

  @Input() name: string;
  @Input() username: string;
  @Input() answers: Observable<Answer[]>;

  pollID: number;
  member: Member;
  answerForm = this.fb.group({
    chosenAnswer: new FormControl('', Validators.required)
  });


  onSubmit() {
    let newVote = new Vote(0, this.answerForm.get("chosenAnswer").value, this.member.memberID);
    this._voteService.addVote(newVote).subscribe();
  }
}
