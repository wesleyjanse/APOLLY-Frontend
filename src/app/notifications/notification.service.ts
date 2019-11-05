import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticateService } from '../login/services/authenticate.service';
import { Friend } from '../models/friend.model';
import { FriendsModule } from '../friends/friends.module';
import { PollMember } from '../models/pollmember.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _httpClient: HttpClient) { 
  }

  getNotificationCount(memberID: number){
    return this._httpClient.get<number>("https://localhost:44371/api/friends/getCountNotifications/" + memberID);
  }

  getNotificationCountPolls(memberID: number){
    return this._httpClient.get<number>("https://localhost:44371/api/friends/getCountNotifications/" + memberID);
  }

  updateFriend(friendID: number, friend: Friend){
    return this._httpClient.put<Friend>("https://localhost:44371/api/Friends/" + friendID, friend);
  }

  cancelRequest(friendID: number){
    return this._httpClient.delete<Friend>("https://localhost:44371/api/Friends/" + friendID)
  }
  
  cancelPollRequest(friendID: number){
    return this._httpClient.delete<PollMember>("https://localhost:44371/api/PollMembers/" + friendID)
  }

  acceptPoll(pollID: number, Pollmember: PollMember){
    return this._httpClient.put<PollMember>("https://localhost:44371/api/PollMembers/" + pollID, Pollmember);
  }
}
