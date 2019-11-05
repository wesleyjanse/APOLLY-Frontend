import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';
import { AuthenticateService } from 'src/app/login/services/authenticate.service';
import { Member } from 'src/app/models/member.model';
import { Observable } from 'rxjs';
import { Friend } from 'src/app/models/friend.model';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MemberService } from '../member.service';
import { NotificationService } from 'src/app/notifications/notification.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'snack-bar-component',
  templateUrl: './snack-bar-component.html',
  styleUrls: ['./friend.component.scss']
})
export class SnackBarComponent { }

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  member: Member;
  options: Friend[] = [];
  optionsMember: Member[] = [];

  constructor(private _snackBar: MatSnackBar, private _notificationService: NotificationService, private fb: FormBuilder, private _friendService: FriendService, private _authenticateService: AuthenticateService, private _memberService: MemberService) {
    this._authenticateService.isLoggedin.subscribe(e => {
      if (localStorage.getItem('member') != null) {
        this.member = JSON.parse(localStorage.getItem('member'));
      }
    });
  }

  myControl = new FormControl();
  filteredOptions: Observable<Friend[]>;
  filteredMemberOptions: Observable<Member[]>;
  addForm = this.fb.group({
    addControl: new FormControl('', Validators.compose([
      Validators.minLength(4)
    ])),
  });

  ngOnInit() {
    this.options = [];
    this.optionsMember = [];
    this._friendService.getFriendsByMemberID(this.member.memberID).subscribe((res) => {
      res.forEach(f => {
        this.options.push(f);
      });
    })
    this.filteredOptions = this._friendService.getFriendsByMemberID(this.member.memberID);
    this._memberService.getAll().subscribe((result) => {
      result.forEach(m => {
        if (m.username != this.member.username) {
          this.optionsMember.push(m);
        }
      })
    })

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.filteredMemberOptions = this.addForm.get("addControl").valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterMembers(value))
      );
  }

  alreadyRequested: boolean;
  addUser() {
    this._memberService.getWhereName(this.addForm.get("addControl").value).subscribe((res) => {
      let durationInSeconds = 5;
      let newFriend = new Friend(0, this.member.memberID, res.memberID, false);
      this.alreadyRequested = false
      

      this.options.forEach(o => {
        if (o.friend.username === res.username || o.member.username === res.username) {
          this.alreadyRequested = true;
        }
      })
      if (!this.alreadyRequested) {
        this._friendService.addFriend(newFriend).subscribe(() => {
          this.ngOnInit();
        })
      } else {
        this._snackBar.openFromComponent(SnackBarComponent, {
          duration: durationInSeconds * 1000,
        });
      }
    })
  }

  onClickCancel(friendsID: number) {
    this._notificationService.cancelRequest(friendsID).subscribe(() => {
      this.ngOnInit();
    });
  }


  private _filter(value: string): Friend[] {
    const filterValue = value.toLocaleLowerCase();
    if (filterValue !== "") {
      return this.options.filter(option => option.friend.username.toLocaleLowerCase().includes(filterValue) || option.member.username.toLocaleLowerCase().includes(filterValue));
    } else {
      return this.options;
    }
  }

  private _filterMembers(value: string): Member[] {
    const filterValue = value.toLocaleLowerCase();
    if (filterValue !== "") {
      return this.optionsMember.filter(option => option.username.toLocaleLowerCase().includes(filterValue));
    } else {
      return this.optionsMember;
    }
  }
}
