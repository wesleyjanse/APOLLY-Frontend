import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/models/answer.model';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { VoteService } from '../vote.service';
import { Vote } from 'src/app/models/vote.model';
import { AuthenticateService } from 'src/app/login/services/authenticate.service';
import { Member } from 'src/app/models/member.model';
import { Poll } from 'src/app/models/poll.model';
import { PollService } from '../poll.service';
import { Standing } from 'src/app/models/standings.model';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.scss']
})
export class PollVoteComponent implements OnInit {

  constructor(private fb: FormBuilder, private _voteService: VoteService, private _authenticateService: AuthenticateService, private _pollService: PollService) {
    this._authenticateService.isLoggedin.subscribe(e => {
      if (localStorage.getItem('member') != null) {
        this.member = JSON.parse(localStorage.getItem('member'));
      }
    });
  }

  ngOnInit() { }

  onResize(event) {
    this.pollTitleFontSize = (event.target.innerWidth <= 450) ? true : false;
  }

  @Input() name: string;
  @Input() username: string;
  @Input() answers: Observable<Answer[]>;
  @Input() creator: string;

  submitted: boolean = false;
  pollID: number;
  member: Member;
  poll: Poll;
  alreadyVoted: boolean = false;
  pollTitleFontSize: boolean = false;
  pollOptions: Array<Standing> = [];
  
  answerForm = this.fb.group({
    chosenAnswer: new FormControl('', Validators.required)
  });



  onSubmit() {
    this.pollID = this.answers[0][0].pollID;
    this.submitted = true;
    let newVote = new Vote(0, this.answerForm.get("chosenAnswer").value, this.member.memberID);

    if (this.answers[0][0].votes.find(v => v.memberID == this.member.memberID) || this.answers[0][1].votes.find(v => v.memberID == this.member.memberID)) {
      this.alreadyVoted = true;
      this.countVotes()
    } else {
      this._voteService.addVote(newVote).subscribe(() => {
      this.countVotes()
      });
    }
  }

  countVotes(){
    this._pollService.getPoll(this.pollID).subscribe(result => {
      this.poll = result;
      var total: number = 0;
      for (let i = 0; i < Object.keys(result.answers).length; i++) {
        total += result.answers[i].votes.length
      }

      for (let i = 0; i < Object.keys(result.answers).length; i++) {
        let poll = new Standing(result.answers[i].possibleAnswer, String(Math.floor((result.answers[i].votes.length / total) * 100)))
        this.pollOptions.push(poll);
      }
    });
  }
}
