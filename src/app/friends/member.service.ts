import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<Member[]>{
    return this._httpClient.get<Member[]>("https://localhost:44371/api/member");
  }

  getWhereName(username: string){
    return this._httpClient.get<Member>("https://localhost:44371/api/member/getWhereName/" + username)
  }
}
