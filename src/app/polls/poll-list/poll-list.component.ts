import { Component, OnInit, Input, ɵConsole, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/models/answer.model';
import { PollService } from '../poll.service';
import { Poll } from 'src/app/models/poll.model';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyPollsComponent } from '../my-polls/my-polls.component';
import { AuthenticateService } from 'src/app/login/services/authenticate.service';
import { Standing } from 'src/app/models/standings.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  titel: string;
}

@Component({
  selector: 'dialog-warning',
  templateUrl: 'poll-list-delete-dialog.html',
  styleUrls: ['./poll-list.component.scss']
})
export class DialogWarning {
  constructor(
    public dialogRef: MatDialogRef<PollListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

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
  totalVotes: any;
  creator: String;
  loggedInUsername: String;
  poll: Poll;
  pollOptions: Array<Standing> = [];
  edit: boolean = false;
  editForm: FormGroup;

  constructor(public dialog: MatDialog, private _authenticateService: AuthenticateService, private _pollService: PollService, private fb: FormBuilder, private _pollSerivce: PollService, private _router: Router, private _myPollsComponent: MyPollsComponent) {
    this.editForm = this.fb.group({
      title: new FormControl('', Validators.compose(
        [Validators.minLength(5), Validators.required])),
      privateToggle: new FormControl(true, Validators.required)
    });
    this._authenticateService.isLoggedin.subscribe(e => {
      if (localStorage.getItem('member') != null) {
        this.loggedInUsername = JSON.parse(localStorage.getItem('member')).username;
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
        privateToggle: this.private == "Private" ? true : false
      }
    )
  }

  onEditClick() {
    this.edit = true;
  }
  onCancelClick() {
    this.edit = false;
  }

  deletePoll() {
    const dialogRef = this.dialog.open(DialogWarning, {
      width: '250px',
      data: { title: this.name }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this._pollSerivce.deletePoll(this.pollID).subscribe(
            () => {
              this._myPollsComponent.ngOnInit();
            }
          );
        }
      }
    );
  }

  onSubmit() {
    let pollToUpdate = new Poll(this.pollID, this.editForm.get("title").value, this.editForm.get("privateToggle").value, this.createdOn);
    this._pollSerivce.updatePoll(this.pollID, pollToUpdate).subscribe(() => {
      this._myPollsComponent.ngOnInit();
      this.edit = false;
    });
  }

  countVotes() {
    this._pollService.getPoll(this.pollID).subscribe(result => {
      this.poll = result;
      var total: number = 0;

      for (let i = 0; i < Object.keys(result.answers).length; i++) {
        total += result.answers[i].votes.length
      }

      for (let i = 0; i < Object.keys(result.answers).length; i++) {
        let count = "0";
        if (result.answers[i].votes.length != 0) {
          count = String(Math.floor((result.answers[i].votes.length / total) * 100))
        }
        let poll = new Standing(result.answers[i].possibleAnswer, count)
        this.pollOptions.push(poll);
      }
      this.totalVotes = total;
    });
  }
}
