import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';
import { AuthenticateService } from 'src/app/login/services/authenticate.service';
import { Member } from 'src/app/models/member.model';
import { Observable } from 'rxjs';
import { Friend } from 'src/app/models/friend.model';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  member: Member;
  //friends: Observable<Friend[]>;
  options: Friend[] = [];

  constructor(private _friendService: FriendService, private _authenticateService: AuthenticateService) {
    this._authenticateService.isLoggedin.subscribe(e => {
      if (localStorage.getItem('member') != null) {
        this.member = JSON.parse(localStorage.getItem('member'));
      }
    });
    this.filteredOptions = this._friendService.getFriendsByMemberID(this.member.memberID);
    this._friendService.getFriendsByMemberID(this.member.memberID).subscribe((res) => {
      res.forEach(f => {
        this.options.push(f);
      });
    })
  }

  myControl = new FormControl();
  filteredOptions: Observable<Friend[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  clickedInput() {

  }

  private _filter(value: string): Friend[] {
    const filterValue = value.toLocaleLowerCase();
    if (filterValue !== ""){
      return this.options.filter(option => option.friend.username.toLocaleLowerCase().includes(filterValue));
    } else{
      return this.options;
    }
  }
}
