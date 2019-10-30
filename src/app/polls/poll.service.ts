import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PollMember } from '../models/pollmember.model';
import { Poll } from '../models/poll.model';

@Injectable()
export class PollService {

  constructor(private _httpClient: HttpClient) { }

  getPolls(): Observable<PollMember[]> {
    return this._httpClient.get<PollMember[]>("https://localhost:44371/api/pollmembers");
  }

  getPollsByMemberID(memberID: number): Observable<PollMember[]>{
    return this._httpClient.get<PollMember[]>("https://localhost:44371/api/PollMembers/getAllByMemberId/" + memberID)
  }

  getPoll(pollID: number) {
    return this._httpClient.get<Poll>("https://localhost:44371/api/poll/" + pollID);
  }

  getPollMemberByPollID(pollID: number) {
    return this._httpClient.get<PollMember>("https://localhost:44371/api/PollMembers/getPollMemberByPollId/" + pollID);
  }

  updatePoll(pollID: number, poll: Poll){
    return this._httpClient.put<Poll>("https://localhost:44371/api/Poll/" + pollID, poll);
  }

  addPoll(poll: Poll): Observable<Poll>{
    return this._httpClient.post<Poll>("https://localhost:44371/api/Poll/", poll);
  }

  addPollMember(pollMember: PollMember){
    return this._httpClient.post<PollMember>("https://localhost:44371/api/pollmembers", pollMember)
  }
}
