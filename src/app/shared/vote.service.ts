import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VotePayload } from './vote-button/vote-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  ROUTE_SERVER: string= "http://localhost:8080/"; 

  constructor(private http: HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> {
    return this.http.post(this.ROUTE_SERVER + '/api/votes/', votePayload);
  }
}