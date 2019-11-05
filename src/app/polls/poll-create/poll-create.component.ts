import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MyPollsComponent } from '../my-polls/my-polls.component';
import { PollService } from '../poll.service';
import { Poll } from 'src/app/models/poll.model';
import { AnswerService } from '../answer.service';
import { Answer } from 'src/app/models/answer.model';
import { PollMember } from 'src/app/models/pollmember.model';
import { AuthenticateService } from 'src/app/login/services/authenticate.service';
import { Member } from 'src/app/models/member.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FriendService } from 'src/app/friends/friend.service';
import { Friend } from 'src/app/models/friend.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'snack-bar-component',
  templateUrl: './snack-bar-component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class SnackBarComponent { }

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent implements OnInit {

  titleFormGroup: FormGroup;
  answerFormGroup: FormGroup;
  privateFormGroup: FormGroup;
  membersFormGroup: FormGroup;
  private: boolean = true;
  smallScreen: boolean = false;
  newFriend: boolean = false; 

  answers: string[] = [];
  member: Member;
  constructor(private _snackBar: MatSnackBar, private breakpointObserver: BreakpointObserver, private _friendService: FriendService, private _formBuilder: FormBuilder, private _myPolls: MyPollsComponent, private _pollService: PollService, private _answerService: AnswerService, private _authenticateService: AuthenticateService) {
    this._authenticateService.isLoggedin.subscribe(e => {
      if (localStorage.getItem('member') != null) {
        this.member = JSON.parse(localStorage.getItem('member'));
      }
    });
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  onToggleChange() {
    this.private = !this.private;
  }

  onDragChange() {
    this.private = !this.private;
  }

  myControl = new FormControl();
  options: Friend[] = [];
  filteredOptions: Observable<Friend[]>;

  private _filter(value: string): Friend[] {
    const filterValue = value.toLocaleLowerCase();
    if (filterValue !== "") {
      return this.options.filter(option => option.friend.username.toLocaleLowerCase().includes(filterValue) || option.member.username.toLocaleLowerCase().includes(filterValue));
    } else {
      return this.options;
    }
  }

  ngOnInit() {
    this._friendService.getFriendsByMemberID(this.member.memberID).subscribe((res) => {
      res.forEach(f => {
        this.options.push(f);
      });
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.titleFormGroup = this._formBuilder.group({
      titleCtrl: ['', Validators.required]
    });
    this.answerFormGroup = this._formBuilder.group({
      answerCtrl: ['', Validators.minLength(2)]
    });
    this.privateFormGroup = this._formBuilder.group({
      privateCtrl: [true, Validators.required]
    });
    this.membersFormGroup = this._formBuilder.group({
      membersCtrl: [''],
      emailCtrl: ['', Validators.email]
    });
    this.private = this.privateFormGroup.get("privateCtrl").value;
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

  selectedFriends: Friend[] = [];

  clearItems(v) {
    for (let a of v) {
      var index: number = this.selectedFriends.indexOf(a.value, 0);
      this.selectedFriends.splice(index, 1)
    }
  }

  onEnter(option: Friend) {
    if (!this.selectedFriends.includes(option)) {
      this.selectedFriends.push(option)
    }
  }

  remove(answer: string): void {
    const index = this.answers.indexOf(answer);
    if (index >= 0) {
      this.answers.splice(index, 1);
    }
  }

  clickEmail(){
    this.newFriend = true;
  }
  

  snackbarRef: SnackBarComponent;
  sendEmail(){
    this.snackbarRef = this._snackBar.open("Email invite has been sent to: " + this.membersFormGroup.get("emailCtrl").value, '', {
      duration: 3000
    });
  }

  onSubmit() {
    var today = new Date();
    let pollToAdd = new Poll(0, this.titleFormGroup.get("titleCtrl").value, this.privateFormGroup.get("privateCtrl").value, today);

    if (this.answers.length >= 2) {
      this._pollService.addPoll(pollToAdd).subscribe(
        (result) => {
          this.answers.forEach(string => {
            let newAnswer = new Answer(0, string, result.pollID)
            this._answerService.addAnswer(newAnswer).subscribe();
          });
          let newPollMember = new PollMember(0, result.pollID, this.member.memberID, true, true)
          this._pollService.addPollMember(newPollMember).subscribe(
            () => {
              if (!this.private) {
                this._myPolls.ngOnInit();
              }
              else {
                this.selectedFriends.forEach(friend => {
                  if (friend.friend.memberID == this.member.memberID) {
                    var newPM = new PollMember(0, result.pollID, friend.member.memberID, false, false)
                  } else {
                    var newPM = new PollMember(0, result.pollID, friend.friend.memberID, false, false)
                  }
                  this._pollService.addPollMember(newPM).subscribe(
                    () => {
                      this._myPolls.ngOnInit();
                    }
                  );
                })
              }
            }
          );
        }
      );
    } else{
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 10 * 1000,
      });
    }

    this._myPolls.create = false;
    this._myPolls.ngOnInit;
  }
}
