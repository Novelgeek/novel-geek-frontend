
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll } from '../_models/poll.model';

@Injectable({providedIn: 'root'})
export class PollService {

  constructor(private http: HttpClient) { }

  getPolls(){
    return this.http.get<any>('/poll/all');
  }

  getPollsForUser() {
    return this.http.get<any>('/poll/user');
  }

  getPoll(id) {
    return this.http.get<any>('/poll/' + id);
  }

  savePoll(poll: Poll) {
    return this.http.post('/poll/newpoll', poll);
  }

  deletePoll(pollid: number) {
    return this.http.delete('/poll/delete/' + pollid);
  }

  vote(pollId: number, selectedOption: number){
    return this.http.post('/poll/' + pollId + '/vote/' + selectedOption, {});
  }



}
