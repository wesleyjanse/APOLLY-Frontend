import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/member.model';
import { Friend } from '../models/friend.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private _httpClient: HttpClient) { }

  getFriendsByMemberID(memberID: number): Observable<Friend[]>{
    return this._httpClient.get<Friend[]>("https://apolly-backend20191125052638.azurewebsites.net/api/friends/getAllByMemberID/" + memberID)
  }

  getFriendRequestsByMemberID(memberID: number): Observable<Friend[]>{
    return this._httpClient.get<Friend[]>("https://apolly-backend20191125052638.azurewebsites.net/api/friends/getAllRequestsByMemberID/" + memberID)
  }

  addFriend(friend: Friend): Observable<Friend>{
    return this._httpClient.post<Friend>("https://apolly-backend20191125052638.azurewebsites.net/api/friends", friend)
  }

}
