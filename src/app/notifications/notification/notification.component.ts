import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Friend } from 'src/app/models/friend.model';
import { Observable } from 'rxjs';
import { FriendService } from '../../friends/friend.service';
import { AuthenticateService } from 'src/app/login/services/authenticate.service';
import { Member } from 'src/app/models/member.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  requests: Observable<Friend[]> = null;
  member: Member;
  constructor(private _notificationService: NotificationService, private _friendService: FriendService, private _authenticateService: AuthenticateService) {
  }

  onClickAdd(friendsID: number, memberID: number) {
    let friendToUpdate: Friend = new Friend(friendsID, memberID, this.member.memberID, true)
    this._notificationService.updateFriend(friendsID, friendToUpdate).subscribe(()=>
    {
      this.ngOnInit();
    });
  }

  onClickCancel(friendsID: number) {
    this._notificationService.cancelRequest(friendsID).subscribe(()=>
    {
      this.ngOnInit();
    });
  }
  
  ngOnInit() {
    this._authenticateService.isLoggedin.subscribe(e => {
      if (localStorage.getItem('member') != null) {
        this.member = JSON.parse(localStorage.getItem('member'));
        this.requests = this._friendService.getFriendRequestsByMemberID(this.member.memberID);
      }
    });
  }
}
