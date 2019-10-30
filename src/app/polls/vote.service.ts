import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vote } from '../models/vote.model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private _httpClient: HttpClient) { }

  addVote(vote: Vote){
    return this._httpClient.post<Vote>("https://localhost:44371/api/vote", vote);
  }
}
