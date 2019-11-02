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
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent implements OnInit {

  titleFormGroup: FormGroup;
  answerFormGroup: FormGroup;
  submitFormGroup: FormGroup;
  answers: string[] = [];
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



  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.answers.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(answer: string): void {
    const index = this.answers.indexOf(answer);

    if (index >= 0) {
      this.answers.splice(index, 1);
    }
  }


  onSubmit() {
    var today = new Date();
    let pollToAdd = new Poll(0, this.titleFormGroup.get("titleCtrl").value, this.submitFormGroup.get("privateCtrl").value, today);
    
    this._pollService.addPoll(pollToAdd).subscribe(
      (result)=>{
        this.answers.forEach(string => {
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
