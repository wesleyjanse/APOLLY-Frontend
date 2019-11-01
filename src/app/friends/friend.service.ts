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
    return this._httpClient.get<Friend[]>("https://localhost:44371/api/friends/getAllByMemberID/" + memberID)
  }

}
