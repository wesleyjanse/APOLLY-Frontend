import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyPollsComponent } from '../my-polls/my-polls.component';
import { PollService } from '../poll.service';
import { Poll } from 'src/app/models/poll.model';
import { Observable } from 'rxjs';
import { AnswerService } from '../answer.service';
import { Answer } from 'src/app/models/answer.model';
import { PollMember } from 'src/app/models/pollmember.model';
import { AuthenticateService } from 'src/app/login/services/authenticate.service';
import { Member } from 'src/app/models/member.model';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent implements OnInit {

  titleFormGroup: FormGroup;
  answerFormGroup: FormGroup;
  submitFormGroup: FormGroup;
  member: Member;
  constructor(private _formBuilder: FormBuilder, private _myPolls: MyPollsComponent, private _pollService: PollService, private _answerService: AnswerService, private _authenticateService: AuthenticateService) {
    this._authenticateService.isLoggedin.subscribe(e=> {
      if (localStorage.getItem('member') != null) {
        this.member =  JSON.parse(localStorage.getItem('member'));
      }
    });
   }

  ngOnInit() {
    this.titleFormGroup = this._formBuilder.group({
      titleCtrl: ['', Validators.required]
    });
    this.answerFormGroup = this._formBuilder.group({
      answerCtrl: ['', Validators.required]
    });
    this.submitFormGroup = this._formBuilder.group({
      privateCtrl: [false, Validators.required]
    });
  }

  onSubmit() {
    var splitted = this.answerFormGroup.get("answerCtrl").value.split(","); 
    var splittedFiltered = splitted.filter((item) => item != ' ')
   
    var today = new Date();
    let pollToAdd = new Poll(0, this.titleFormGroup.get("titleCtrl").value, this.submitFormGroup.get("privateCtrl").value, today);
    
    this._pollService.addPoll(pollToAdd).subscribe(
      (result)=>{
        splittedFiltered.forEach(string => {
          let newAnswer = new Answer(0, string, result.pollID)
          this._answerService.addAnswer(newAnswer).subscribe();
        });
        let newPollMember = new PollMember(0, result.pollID, this.member.memberID)
        this._pollService.addPollMember(newPollMember).subscribe(
          () => {
            this._myPolls.ngOnInit();
          }
        );
      }
    );

    this._myPolls.create = false;
    this._myPolls.ngOnInit;
  }
}
