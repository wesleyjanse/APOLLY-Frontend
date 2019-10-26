import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MemberLogin } from '../../models/memberLogin.model';
import { Member } from '../../models/member.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {
  isLoggedin = new BehaviorSubject(false);

  constructor(private _httpClient: HttpClient) { }
  authenticate(memberLogin: MemberLogin): Observable<Member> {
    return this._httpClient.post<Member>("https://localhost:44371/api/Member/authenticate", memberLogin);
  }
}
