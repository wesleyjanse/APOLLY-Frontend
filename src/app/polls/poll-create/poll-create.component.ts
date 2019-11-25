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
import { RegisterService } from 'src/app/login/register.service';
import { Email } from 'src/app/models/email.model';

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
  newMembers: Member[] = [];
  snackbarRef: SnackBarComponent;
  answers: string[] = [];
  member: Member;
  myControl = new FormControl();
  options: Friend[] = [];
  filteredOptions: Observable<Friend[]>;
  selectedFriends: Friend[] = [];

  constructor(private _snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private _registerService: RegisterService,
    private _friendService: FriendService,
    private _formBuilder: FormBuilder,
    private _myPolls: MyPollsComponent,
    private _pollService: PollService,
    private _answerService: AnswerService,
    private _authenticateService: AuthenticateService) {

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

  clickEmail() {
    this.newFriend = !this.newFriend;
  }

  sendEmail() {
    let mailToSend: Email = new Email(0, this.membersFormGroup.get("emailCtrl").value, "Invited to vote on a poll", `Hi there! <br/><br/>

    You have been invited by ${this.member.username}(${this.member.email}) to vote on a poll named ${this.titleFormGroup.get("titleCtrl").value}... <br/>
    But it seems like you haven't created an account yet! <br/>
    Feel free to create an account using this emailadres so you will be automatically added to your friends poll! <br/><br/>
    Follow this link to create an account: <a href='https://apolly.azurewebsites.net/Register/${this.membersFormGroup.get("emailCtrl").value}/'>Click here!</a><br/>
    See you soon!`)

    this._registerService.sendMail(mailToSend).subscribe(() => {
      this.snackbarRef = this._snackBar.open("Email invite has been sent to: " + this.membersFormGroup.get("emailCtrl").value, '', {
        duration: 3000
      });
    })

	//Random username 
    let username = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    this._registerService.addMember(new Member(0, username, "temporary", this.membersFormGroup.get("emailCtrl").value, '', false)).subscribe(result => {
      this.newMembers.push(result);
      console.log(result);
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
              if (this.private) {
                this.selectedFriends.forEach(friend => {
                  if (friend.friend.memberID == this.member.memberID) {
                    var newPM = new PollMember(0, result.pollID, friend.member.memberID, false, false)
                  } else {
                    var newPM = new PollMember(0, result.pollID, friend.friend.memberID, false, false)
                  }
                  this._pollService.addPollMember(newPM).subscribe()
                })
                this.newMembers.forEach(member => {
                  let newPMnotRegistered = new PollMember(0, result.pollID, member.memberID, false, false)
                  this._pollService.addPollMember(newPMnotRegistered).subscribe(() => {
                  })
                })
              }
              this._myPolls.ngOnInit();
            });
        });
      this.snackbarRef = this._snackBar.open("Poll: \"" + this.titleFormGroup.get("titleCtrl").value + "\" has been created!", '', {
        duration: 3000
      });
    } else {
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 10 * 1000,
      });
    }
    this._myPolls.create = false;
  }
}
