import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PollMember } from '../models/pollmember.model';

@Injectable()
export class PollService {

  constructor(private _httpClient: HttpClient) { }

  getPolls(): Observable<PollMember[]> {
    return this._httpClient.get<PollMember[]>("https://localhost:44371/api/pollmembers");
  }
}
