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
    return this._httpClient.get<number>("https://apolly-backend20191125052638.azurewebsites.net/api/friends/getCountNotifications/" + memberID);
  }

  getNotificationCountPolls(memberID: number){
    return this._httpClient.get<number>("https://apolly-backend20191125052638.azurewebsites.net/api/friends/getCountNotifications/" + memberID);
  }

  updateFriend(friendID: number, friend: Friend){
    return this._httpClient.put<Friend>("https://apolly-backend20191125052638.azurewebsites.net/api/Friends/" + friendID, friend);
  }

  cancelRequest(friendID: number){
    return this._httpClient.delete<Friend>("https://apolly-backend20191125052638.azurewebsites.net/api/Friends/" + friendID)
  }
  
  cancelPollRequest(friendID: number){
    return this._httpClient.delete<PollMember>("https://apolly-backend20191125052638.azurewebsites.net/api/PollMembers/" + friendID)
  }

  acceptPoll(pollID: number, Pollmember: PollMember){
    return this._httpClient.put<PollMember>("https://apolly-backend20191125052638.azurewebsites.net/api/PollMembers/" + pollID, Pollmember);
  }
}
