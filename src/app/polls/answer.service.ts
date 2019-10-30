import { Injectable } from '@angular/core';
import { Answer } from '../models/answer.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private _httpClient: HttpClient) { }

  addAnswer(answer: Answer): Observable<Answer>{
    return this._httpClient.post<Answer>("https://localhost:44371/api/Answer/", answer);
  }
}
