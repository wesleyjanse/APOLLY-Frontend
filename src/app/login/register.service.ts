import { Injectable } from '@angular/core';
import { Member } from '../models/member.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private _httpClient: HttpClient) { }

  addMember(member: Member){
    return this._httpClient.post<Member>("https://localhost:44371/api/member", member);
  }
}
