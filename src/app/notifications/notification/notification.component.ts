import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Friend } from 'src/app/models/friend.model';
import { Observable } from 'rxjs';
import { FriendService } from '../../friends/friend.service';
import { AuthenticateService } from 'src/app/login/services/authenticate.service';
import { Member } from 'src/app/models/member.model';
import { PollMember } from 'src/app/models/pollmember.model';
import { PollService } from 'src/app/polls/poll.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  pollRequests: PollMember[] = null;
  requests: Observable<Friend[]> = null;
  member: Member;
  openRequests: boolean = false;
  currentCount: number;
  constructor(private _pollService: PollService, private _notificationService: NotificationService, private _friendService: FriendService, private _authenticateService: AuthenticateService) {
  }

  onClickAdd(friendsID: number, memberID: number) {
    let friendToUpdate: Friend = new Friend(friendsID, memberID, this.member.memberID, true)
    this._notificationService.updateFriend(friendsID, friendToUpdate).subscribe(() => {
      this.ngOnInit();
    });
  }

  onClickCancel(friendsID: number) {
    this._notificationService.cancelRequest(friendsID).subscribe(() => {
      this.ngOnInit();
    });
  }

  onClickAccept(pollmemberID: number, pollID: number) {
    let pollmemberToUpdate: PollMember = new PollMember(pollmemberID, pollID, this.member.memberID, true, false)
    this._notificationService.acceptPoll(pollmemberID, pollmemberToUpdate).subscribe(() => {
      this.ngOnInit();
    });
  }

  onClickReject(pollmemberID: number) {
    this._notificationService.cancelPollRequest(pollmemberID).subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this._authenticateService.isLoggedin.subscribe(e => {
      if (localStorage.getItem('member') != null) {
        var creator: Member;
        this.member = JSON.parse(localStorage.getItem('member'));
        this.requests = this._friendService.getFriendRequestsByMemberID(this.member.memberID);
        this._pollService.getPollsByMemberID(this.member.memberID).subscribe((result) => {
          this.pollRequests = result
          this.pollRequests.forEach(element => {
            if (element.accepted == false) {
              this.openRequests = true;
            }
            this._pollService.getCreatorFromPoll(element.pollID).subscribe((result) => {
              creator = result;
              element.creatorName = creator.username;
            });
          });
        });
      }
    });
  }
}
