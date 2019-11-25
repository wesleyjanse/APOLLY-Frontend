import { Injectable } from '@angular/core';
import { Member } from '../models/member.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email } from '../models/email.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private _httpClient: HttpClient) { }

  addMember(member: Member){
    return this._httpClient.post<Member>("https://apolly-backend20191125052638.azurewebsites.net/api/member", member);
  }

  sendMail(email: Email){
    return this._httpClient.post<Email>("https://apolly-backend20191125052638.azurewebsites.net/api/member/sendmail", email);
  }

  getWhereEmail(email: string): Observable<Member>{
    return this._httpClient.get<Member>("https://apolly-backend20191125052638.azurewebsites.net/api/member/getWhereEmail/" + email)
  }

  updateMember(memberID: number, member: Member): Observable<Member>{
    return this._httpClient.put<Member>("https://apolly-backend20191125052638.azurewebsites.net/api/member/" + memberID, member)
  }

  getWhereID(memberID: number){
    return this._httpClient.get<Member>("https://apolly-backend20191125052638.azurewebsites.net/api/member/" + memberID);
  }
}
