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
    return this._httpClient.post<Member>("https://apolly-backend20191125052638.azurewebsites.net/api/Member/authenticate", memberLogin);
  }

  checkLoggedIn() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }
}
